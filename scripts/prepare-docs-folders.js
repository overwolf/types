#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const out = process.argv[2] || path.join(process.cwd(), 'docs', 'markdown', 'api');

function ensure(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function extractNamespacesFromFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const ns = new Set();
  // matches: declare namespace a.b.c or namespace a.b.c
  const re = /(?:declare\s+)?namespace\s+([a-zA-Z0-9_.]+)/g;
  let m;
  while ((m = re.exec(content))) ns.add(m[1]);
  return Array.from(ns);
}

function run() {
  ensure(out);
  const files = glob.sync(path.join(process.cwd(), 'modules', '*.d.ts'));
  const allNs = new Set();
  for (const f of files) {
    const ns = extractNamespacesFromFile(f);
    ns.forEach(n => allNs.add(n.toLowerCase()));
  }

  for (const ns of allNs) {
    if (!ns.startsWith('overwolf')) continue;
    const parts = ns.split('.');
    if (parts.length < 2) continue;
    const group = parts[1];
    const subParts = parts.slice(1); // include the group as first segment to match organizer behavior
    const dir = path.join(out, group, ...subParts);
    ensure(dir);
    // also create an Overview placeholder so empty dirs are visible
    const overview = path.join(dir, 'Overview.mdx');
    if (!fs.existsSync(overview)) {
      fs.writeFileSync(overview, `# Overview — ${subParts.join('.')}\n\n*Placeholder*\n`,'utf8');
    }
  }

  // Create top-level group Overview files
  const groups = fs.readdirSync(out, { withFileTypes: true }).filter(d=>d.isDirectory()).map(d=>d.name);
  for (const g of groups) {
    const p = path.join(out, g, 'Overview.mdx');
    if (!fs.existsSync(p)) fs.writeFileSync(p, `# Overview — ${g}\n\n*Group placeholder*\n`,'utf8');
  }

  console.log('Prepared docs folder skeleton at', out);
}

run();
