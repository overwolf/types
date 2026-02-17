#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
// no external deps — use native recursive listing

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function yamlValue(value) {
  if (typeof value === 'string') return yamlQuote(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return yamlQuote(String(value));
}

function upsertFrontmatterKeys(content, entries) {
  const fmRe = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const m = content.match(fmRe);
  const kv = entries.map(([k, v]) => [k, yamlValue(v)]);
  if (m) {
    const fmBody = m[1];
    const lines = fmBody.split(/\r?\n/);
    const seen = new Set();
    const next = lines.map(line => {
      for (const [k, v] of kv) {
        if (new RegExp(`^\\s*${k}\\s*:`).test(line)) {
          seen.add(k);
          return `${k}: ${v}`;
        }
      }
      return line;
    });
    for (const [k, v] of kv) {
      if (!seen.has(k)) next.push(`${k}: ${v}`);
    }
    const newFm = `---\n${next.join('\n')}\n---\n`;
    return newFm + content.slice(m[0].length);
  }
  const body = kv.map(([k, v]) => `${k}: ${v}`).join('\n');
  return `---\n${body}\n---\n\n${content}`;
}

function upsertSidebarLabelFrontmatter(content, sidebarLabel) {
  if (!sidebarLabel) return content;
  const fmRe = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const m = content.match(fmRe);
  const labelLine = `sidebar_label: ${yamlQuote(sidebarLabel)}`;
  if (m) {
    const fmBody = m[1];
    const lines = fmBody.split(/\r?\n/);
    let found = false;
    const next = lines.map(line => {
      if (/^\s*sidebar_label\s*:/.test(line)) {
        found = true;
        return labelLine;
      }
      return line;
    });
    if (!found) next.push(labelLine);
    const newFm = `---\n${next.join('\n')}\n---\n`;
    return newFm + content.slice(m[0].length);
  }
  return `---\n${labelLine}\n---\n\n${content}`;
}

function computeSidebarLabel(file, outDir) {
  const rel = path.relative(outDir, file);
  const parts = rel.split(path.sep);
  if (parts.length < 2) return null;
  const group = parts[0].toLowerCase();
  const base = path.basename(file, path.extname(file));
  if (base.toLowerCase() === 'overview') return 'Overview';
  const lower = base.toLowerCase();
  const prefix = `overwolf.${group}.`;
  if (lower.startsWith(prefix)) return base.slice(prefix.length);
  const altPrefix = `overwolf.${group}`;
  if (lower.startsWith(altPrefix)) {
    let rest = base.slice(altPrefix.length);
    if (rest.startsWith('.')) rest = rest.slice(1);
    return rest || base;
  }
  return base;
}

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

  // Additional sanitization: avoid raw HTML tags and MDX expressions breaking compilation
  // Preserve fenced code blocks and inline code while sanitizing the rest
  const codeFenceRe = /(```[\s\S]*?```)/g;
  const inlineCodeRe = /(`[^`]*`)/g;
  const codeFences = [];
  s = s.replace(codeFenceRe, (m) => { codeFences.push(m); return `__CODEFENCE_${codeFences.length-1}__`; });
  const inlineCodes = [];
  s = s.replace(inlineCodeRe, (m) => { inlineCodes.push(m); return `__INLINECODE_${inlineCodes.length-1}__`; });

  // Escape curly braces (MDX expressions) outside code to avoid acorn parse errors
  s = s.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');

  // Restore inline code and code fences
  s = s.replace(/__INLINECODE_(\d+)__/g, (_, idx) => inlineCodes[Number(idx)] || '');
  s = s.replace(/__CODEFENCE_(\d+)__/g, (_, idx) => codeFences[Number(idx)] || '');
  // Ensure root Overview frontmatter stays consistent
  if (path.resolve(file) === path.join(out, 'Overview.mdx')) {
    s = upsertFrontmatterKeys(s, [
      ['sidebar_position', 1],
      ['sidebar_label', 'Overview'],
      ['title', 'Overview'],
      ['unlisted', false],
      ['toc_max_heading_level', 6],
    ]);
  }

  const sidebarLabel = computeSidebarLabel(file, out);
  s = upsertSidebarLabelFrontmatter(s, sidebarLabel);

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
