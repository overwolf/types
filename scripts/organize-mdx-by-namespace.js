#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await listFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function detectNamespace(content, filename) {
  // Try explicit Namespace heading
  const nsMatch = content.match(/Namespace[:\s`]*([a-z0-9_.]+)/i);
  if (nsMatch) return nsMatch[1];

  // Look for longest overwolf.x.y pattern
  const ow = content.match(/overwolf(?:\.[a-z0-9_]+){1,}/i);
  if (ow) return ow[0].toLowerCase();

  // Fall back to filename (strip extension)
  const base = path.basename(filename, path.extname(filename));
  if (base.includes('.')) return base.toLowerCase();

  return null;
}

function masterNamespace(ns) {
  if (!ns) return 'misc';
  const parts = ns.split('.');
  if (parts.length >= 2) return `${parts[0]}.${parts[1]}`;
  return parts[0];
}

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch (e) { }
}

async function run() {
  const argv = require('minimist')(process.argv.slice(2));
  const out = path.resolve(process.cwd(), argv.out || argv.o || 'docs/markdown/api');
  const all = await listFiles(out);

  // Filter MDX files, skip typedoc overview/readme
  const mdxFiles = all.filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .filter(f => {
      const name = path.basename(f).toLowerCase();
      return !['overview.mdx','overview.md','typedoc-readme.mdx','typedoc-readme.md'].includes(name);
    });

  const groups = new Map();

  for (const file of mdxFiles) {
    const content = await fs.readFile(file, 'utf8');
    const ns = detectNamespace(content, file);
    const master = masterNamespace(ns);
    if (!groups.has(master)) groups.set(master, []);
    groups.get(master).push({ file, content });
  }

  // Move files into namespace folders
  for (const [ns, items] of groups) {
    const nsDir = path.join(out, ns);
    await ensureDir(nsDir);
    for (const it of items) {
      const dest = path.join(nsDir, path.basename(it.file));
      try {
        await fs.rename(it.file, dest);
      } catch (e) {
        // fallback to copy+unlink
        await fs.writeFile(dest, it.content, 'utf8');
        await fs.unlink(it.file).catch(()=>{});
      }
    }

    // Create Overview.mdx for the namespace
    const filesInNs = await fs.readdir(nsDir);
    const links = filesInNs.filter(n => !/^overview(\.mdx|\.md)$/i.test(n)).map(n => `- [${n.replace(/(\.mdx|\.md)$/i,'')}](${n})`).join('\n');
    const overview = `# Overview — ${ns}\n\n${links || '*No pages generated.*'}\n`;
    await fs.writeFile(path.join(nsDir, 'Overview.mdx'), overview, 'utf8');
  }

  // Root overview with list of namespaces
  const namespaceList = Array.from(groups.keys()).sort().map(ns => `- [${ns}](${ns}/Overview.mdx)`).join('\n');
  const rootOverview = `# API Namespaces\n\n${namespaceList || '*No namespaces found.*'}\n`;
  await fs.writeFile(path.join(out, 'Overview.mdx'), rootOverview, 'utf8');

  console.log('Organized MDX into', groups.size, 'namespaces at', out);
}

run().catch(err => { console.error(err); process.exit(1); });
