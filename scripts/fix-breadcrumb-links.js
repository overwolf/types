#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
// no external deps — use native recursive listing

async function fixFile(file) {
  let s = await fs.readFile(file, 'utf8');
  const orig = s;
  // Remove leading breadcrumb line if present (series of markdown links separated by '/'), e.g.:
  // [Overwolf APIs](... ) / [overwolf](...) / [media](...) / name
  s = s.replace(/^\s*(?:\[[^\]]+\]\([^\)]+\)\s*(?:\/\s*)?)+\r?\n/, '');

  // Replace Overview.mdx links with a relative path to the group's Overview.mdx
  // Determine top-level group for this file relative to the output folder
  const out = path.resolve(process.cwd(), process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out')+1] : (process.argv.includes('-o') ? process.argv[process.argv.indexOf('-o')+1] : 'docs/markdown/api'));
  const rel = path.relative(out, file);
  const relParts = rel.split(path.sep);
  // Only treat the first path segment as a "group" if this file is in a subfolder
  const group = relParts.length > 1 ? relParts[0] : null;
  let groupOverview = null;
  let groupOverviewExists = false;
  if (group) {
    groupOverview = path.join(out, group, 'Overview.mdx');
    try { await fs.access(groupOverview); groupOverviewExists = true; } catch { /* ignore */ }
  }

  s = s.replace(/\[([^\]]+)\]\(([^\)]+Overview\.mdx)\)/gi, (m, label) => {
    if (!groupOverviewExists) return m;
    const relativePath = path.relative(path.dirname(file), groupOverview).replace(/\\/g, '/');
    return `[${label}](${relativePath})`;
  });

  // Strip other .mdx links ONLY from typedoc-generated files, not from organizer-created Overview.mdx
  // Organizer-created Overview files should keep their links to member files
  const filename = path.basename(file).toLowerCase();
  if (filename !== 'overview.mdx') {
    // This is a typedoc-generated file, strip .mdx/.md links that reference files that may not exist
    // Convert [Label](path/file.mdx#anchor) -> Label (plain text)
    s = s.replace(/\[([^\]]+)\]\(([^)]+?)(?:\.mdx|\.md)(#[^)]+)?\)/gi, '$1');
  } else {
    // This is an organizer-created Overview.mdx, strip .mdx/.md extensions from links (keep link structure)
    // Convert [Label](./file.mdx#anchor) -> [Label](./file#anchor) for Docusaurus
    s = s.replace(/\[([^\]]+)\]\(([^)]+?)(?:\.mdx|\.md)(#[^)]+)?\)/gi, '[$1]($2$3)');
  }

  if (filename === 'overview.mdx') {
    // Normalize same-folder link casing to match actual filenames on disk
    const dir = path.dirname(file);
    const entries = await fs.readdir(dir);
    const nameMap = new Map();
    for (const e of entries) {
      const ext = path.extname(e).toLowerCase();
      if (ext === '.mdx' || ext === '.md') {
        const base = path.basename(e, ext);
        nameMap.set(base.toLowerCase(), base);
      }
    }
    s = s.replace(/\[([^\]]+)\]\((\.\/)([^)#]+)(#[^)]+)?\)/g, (m, label, prefix, slug, hash) => {
      const actual = nameMap.get(slug.toLowerCase());
      if (!actual) return m;
      const newTarget = `${prefix}${actual}${hash || ''}`;
      return `[${label}](${newTarget})`;
    });
  }

  // Normalize leftover repeated separators, but preserve markdown links
  // Protect markdown links first
  const linkRe = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const links = [];
  s = s.replace(linkRe, (m) => { links.push(m); return `__LINK_${links.length-1}__`; });
  // Now normalize separators outside of links
  s = s.replace(/\s*\/\s*/g, ' / ');
  // Restore links
  s = s.replace(/__LINK_(\d+)__/g, (_, idx) => links[Number(idx)] || '');

  // Additional sanitization: avoid raw HTML tags and MDX expressions breaking compilation
  // Preserve fenced code blocks and inline code while sanitizing the rest
  const codeFenceRe = /(```[\s\S]*?```)/g;
  const inlineCodeRe = /(`[^`]*`)/g;
  const codeFences = [];
  s = s.replace(codeFenceRe, (m) => { codeFences.push(m); return `__CODEFENCE_${codeFences.length-1}__`; });
  const inlineCodes = [];
  s = s.replace(inlineCodeRe, (m) => { inlineCodes.push(m); return `__INLINECODE_${inlineCodes.length-1}__`; });

  // Escape angle brackets so MDX parser doesn't interpret stray HTML tags
  s = s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Escape curly braces (MDX expressions) outside code to avoid acorn parse errors
  s = s.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');

  // Restore inline code and code fences
  s = s.replace(/__INLINECODE_(\d+)__/g, (_, idx) => inlineCodes[Number(idx)] || '');
  s = s.replace(/__CODEFENCE_(\d+)__/g, (_, idx) => codeFences[Number(idx)] || '');
  if (s !== orig) {
    await fs.writeFile(file, s, 'utf8');
    console.log('Fixed breadcrumb links in', file);
  }
}

async function listFiles(dir) {
  const out = [];
  async function walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.isFile() && full.endsWith('.mdx')) out.push(full);
    }
  }
  await walk(dir);
  return out;
}

async function run() {
  const argv = require('minimist')(process.argv.slice(2));
  const out = path.resolve(process.cwd(), argv.out || argv.o || 'docs/markdown/api');
  const files = await listFiles(out);
  for (const f of files) await fixFile(f);
  console.log('Breadcrumb fix complete.');
}

run().catch(e=>{ console.error(e); process.exit(1); });
