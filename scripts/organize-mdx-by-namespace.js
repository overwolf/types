#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const KIND_FOLDER_BY_SEG = new Map([
  ['interfaces', 'Interfaces'],
  ['classes', 'Classes'],
  ['functions', 'Functions'],
  ['variables', 'Variables'],
  ['enumerations', 'Enums'],
  ['type-aliases', 'Type-aliases'],
  ['type_aliases', 'Type-aliases'],
  ['typealiases', 'Type-aliases'],
]);
const KIND_FOLDER_NAMES = new Set(
  Array.from(KIND_FOLDER_BY_SEG.values()).map(v => v.toLowerCase())
);

function isKindFolderName(name) {
  if (!name) return false;
  return KIND_FOLDER_NAMES.has(String(name).toLowerCase());
}

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

function hasTopDeprecated(content) {
  const trimmed = content.replace(/^\uFEFF/, '');
  const match = trimmed.match(/^\s*\/\*\*[\s\S]*?\*\//);
  if (!match) return false;
  return /@deprecated\b/i.test(match[0]);
}

async function extractPackageDocs(modulesDir) {
  const result = new Map();
  let files;
  try { files = await fs.readdir(modulesDir); } catch { return result; }
  for (const f of files) {
    if (!f.endsWith('.d.ts')) continue;
    const full = path.join(modulesDir, f);
    let content;
    try { content = await fs.readFile(full, 'utf8'); } catch { continue; }
    const trimmed = content.replace(/^\uFEFF/, '');
    const docMatch = trimmed.match(/^\s*\/\*\*([\s\S]*?)\*\//);
    if (!docMatch) continue;
    const lines = docMatch[1].split(/\r?\n/).map(l => l.replace(/^\s*\*\s?/, ''));
    const paragraphs = [];
    let currentPara = [];
    let seenNamespaceLine = false;
    for (const line of lines) {
      const t = line.trim();
      if (!seenNamespaceLine) {
        if (!t) continue;
        seenNamespaceLine = true;
        if (/^overwolf(\.[a-zA-Z0-9_]+)*$/.test(t)) continue;
      }
      if (t.startsWith('@')) break;
      if (/^\d+\./.test(t)) break;
      if (t && line.length - line.trimStart().length >= 3) break;
      if (!t) {
        if (currentPara.length) { paragraphs.push(currentPara.join(' ')); currentPara = []; }
        continue;
      }
      currentPara.push(t);
    }
    if (currentPara.length) paragraphs.push(currentPara.join(' '));
    if (!paragraphs.length) continue;
    result.set(path.basename(f, '.d.ts').toLowerCase(), paragraphs.join('\n\n'));
  }
  return result;
}

async function getDeprecatedNamespaces(modulesDir) {
  const set = new Set();
  try {
    const files = await fs.readdir(modulesDir);
    for (const f of files) {
      if (!f.endsWith('.d.ts')) continue;
      const full = path.join(modulesDir, f);
      const content = await fs.readFile(full, 'utf8');
      if (!hasTopDeprecated(content)) continue;
      const ns = path.basename(f, '.d.ts').toLowerCase();
      if (ns) set.add(ns);
    }
  } catch {
    // ignore
  }
  return set;
}

function isDeprecatedNamespace(ns, deprecatedSet) {
  if (!ns || !deprecatedSet || deprecatedSet.size === 0) return false;
  const lower = ns.toLowerCase();
  for (const dep of deprecatedSet) {
    if (lower === dep) return true;
    if (lower.startsWith(dep + '.')) return true;
  }
  return false;
}

function detectNamespace(content, filename, outDir) {
  // For Overview.mdx files in a namespace folder, extract from folder name
  const basename = path.basename(filename);
  if (basename.toLowerCase() === 'overview.mdx') {
    const dirname = path.basename(path.dirname(filename));
    if (dirname.toLowerCase().startsWith('overwolf.')) {
      return dirname.toLowerCase();
    }
  }

  // Prefer namespace derived from the typedoc output path (namespaces/.../namespaces/...)
  if (outDir) {
    const rel = path.relative(outDir, filename);
    const parts = rel.split(path.sep);
    const nsParts = [];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].toLowerCase() === 'namespaces' && i + 1 < parts.length) {
        const raw = parts[i + 1];
        const clean = raw.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.]/g, '').toLowerCase();
        if (clean) nsParts.push(clean);
      }
    }
    if (nsParts.length) return nsParts.join('.');
  }

  // Try explicit Namespace heading (ignore very short/garbage headers like "s")
  const nsMatch = content.match(/Namespace[:\\s`]*([a-z0-9_.]+)/i);
  if (nsMatch && nsMatch[1] && nsMatch[1].length > 2) return nsMatch[1];

  // Try to parse breadcrumb link labels (e.g. [overwolf](...)/[media](...)/[replays](...)/name)
  const linkLabels = [];
  const linkRe = /\[([^\]]+)\]\([^\)]+\)/g;
  let m;
  // Only scan first 3KB — breadcrumbs are at the top
  const head = content.slice(0, 3 * 1024);
  while ((m = linkRe.exec(head))) {
    linkLabels.push(m[1]);
  }
  if (linkLabels.length) {
    // Prefer the last "overwolf" label in the breadcrumb trail (handles nested namespaces)
    const isOw = l => /^overwolf(\.|$)/i.test(l) || /^overwolf/i.test(l);
    const exactOw = l => /^overwolf$/i.test(l);
    let idx = -1;
    for (let i = linkLabels.length - 1; i >= 0; i--) {
      const label = linkLabels[i].trim();
      if (exactOw(label)) { idx = i; break; }
    }
    if (idx < 0) {
      for (let i = linkLabels.length - 1; i >= 0; i--) {
        const label = linkLabels[i].trim();
        if (isOw(label)) { idx = i; break; }
      }
    }
    if (idx >= 0) {
      // take subsequent labels (excluding the final page name) to form namespace
      // drop common labels like 'Overview' or 'Overwolf APIs'
      const segs = [];
      for (let i = idx; i < linkLabels.length - 1; i++) {
        const label = linkLabels[i].trim();
        if (/^overview$/i.test(label) || /^overwolf apis$/i.test(label)) continue;
        // If a label includes dots (e.g. overwolf.benchmarking), split into segments
        const rawParts = label.includes('.') ? label.split('.') : [label];
        for (const part of rawParts) {
          const clean = part.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.]/g, '').toLowerCase();
          if (clean) segs.push(clean);
        }
      }
      if (segs.length) return segs.join('.');
    }
  }

  // Look for longest overwolf.x.y pattern
  const ow = content.match(/overwolf(?:\.[a-z0-9_]+){1,}/i);
  if (ow) return ow[0].toLowerCase();

  // Fall back to filename (strip extension)
  const base = path.basename(filename, path.extname(filename));
  if (base.includes('.')) return base.toLowerCase();

  return null;
}

function detectKindFromPath(filename, outDir) {
  if (!outDir) return null;
  const rel = path.relative(outDir, filename);
  const parts = rel.split(path.sep).map(p => p.toLowerCase());
  for (const part of parts) {
    if (KIND_FOLDER_BY_SEG.has(part)) return KIND_FOLDER_BY_SEG.get(part);
  }
  return null;
}

function masterNamespace(ns) {
  if (!ns) return 'misc';
  const parts = ns.split('.');
  // If it's an overwolf.* namespace, group by the second segment (profile, media, etc.)
  if (parts[0] === 'overwolf' && parts.length >= 2) return capitalize(parts[1]);
  // For other namespaces, keep first two segments if available
  if (parts.length >= 2) return `${parts[0]}.${parts[1]}`;
  return parts[0];
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const CATEGORY_LABEL_OVERRIDES = new Map([
  ['campaigns/crossapp', 'CrossApp Campaigns'],
]);

function labelForSubdir(groupName, subdirName) {
  const key = `${String(groupName || '')}/${String(subdirName || '')}`.toLowerCase();
  return CATEGORY_LABEL_OVERRIDES.get(key) || subdirName;
}

function normalizeSubPartsForGroup(groupName, subParts) {
  const group = String(groupName || '').toLowerCase();
  const parts = (subParts || []).map(p => String(p));
  if (group === 'campaigns' && parts.length === 1 && parts[0].toLowerCase() === 'crossapp') {
    return [];
  }
  return parts;
}

function normalizeDisplayLabel(groupName, label) {
  if (!label) return label;
  const group = String(groupName || '').toLowerCase();
  const lower = label.toLowerCase();
  if (group === 'campaigns') {
    const prefix = 'overwolf.campaigns.crossapp.';
    if (lower.startsWith(prefix)) return label.slice(prefix.length);
    if (lower.startsWith('crossapp.')) return label.slice('crossapp.'.length);
  }
  return label;
}

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch (e) { }
}

function isNamespacedOverview(filename) {
  return /\.overview\.(mdx|md)$/i.test(filename);
}

function namespaceKeyFromParts(parts) {
  const clean = (parts || []).filter(Boolean).map(p => String(p));
  if (!clean.length) return null;
  const lower = clean.map(p => p.toLowerCase());
  if (lower[0] === 'overwolf') {
    if (lower.length === 1) return 'overwolf';
    return ['overwolf', ...lower.slice(1)].join('.');
  }
  return ['overwolf', ...lower].join('.');
}

function namespaceKeyForDir(outDir, dirPath) {
  const rel = path.relative(outDir, dirPath);
  if (!rel || rel === '.') return null;
  const parts = rel.split(path.sep).filter(Boolean);
  return namespaceKeyFromParts(parts);
}

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function extractSummaryFromContent(content) {
  let s = stripFrontmatter(content);
  // Drop breadcrumb line if present
  s = s.replace(/^\s*(?:\[[^\]]+\]\([^\)]+\)\s*(?:\/\s*)?)+[^\n]*\r?\n/, '');
  s = s.replace(/^\s*Overwolf APIs\s*\/[^\n]*\r?\n/i, '');
  // Remove fenced code blocks
  s = s.replace(/```[\s\S]*?```/g, '');
  const lines = s.split(/\r?\n/);
  const para = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (para.length) break;
      continue;
    }
    if (/^#{1,6}\s/.test(t)) { if (para.length) break; continue; }
    if (/^\|/.test(t)) { if (para.length) break; continue; }
    if (/^[-*+]\s+/.test(t)) { if (para.length) break; continue; }
    if (/^\d+\.\s+/.test(t)) { if (para.length) break; continue; }
    if (/^>/.test(t)) { if (para.length) break; continue; }
    if (/^<[^>]+>/.test(t)) { if (para.length) break; continue; }
    if (/^@/.test(t)) { if (para.length) break; continue; }
    if (/^(deprecated|since version)\b/i.test(t)) { if (para.length) break; continue; }
    if (/^re-exports\b/i.test(t)) { if (para.length) break; continue; }
    if (/^Overwolf APIs\s*\/?/i.test(t)) { if (para.length) break; continue; }
    para.push(t);
  }
  return para.join(' ').replace(/\s+/g, ' ').trim();
}

function escapeTableCell(text) {
  return String(text || '').replace(/\|/g, '\\|');
}

function buildOverviewTable(rows, opts = {}) {
  const heading = opts.heading || 'Overview';
  const summary = opts.summary ? `${opts.summary}\n\n` : '';
  const emptyPlaceholder = Object.prototype.hasOwnProperty.call(opts, 'emptyPlaceholder')
    ? opts.emptyPlaceholder
    : '-';
  if (!rows.length) {
    return `# ${heading}\n\n${summary}*No pages generated.*\n`;
  }
  const header = `# ${heading}\n\n${summary}| API | Description |\n| --- | --- |\n`;
  const body = rows.map(r => {
    const desc = escapeTableCell(String(r.description || '').replace(/\s*\n+\s*/g, ' ').replace(/<br\s*\/?>/gi, ' ').trim());
    const finalDesc = desc || emptyPlaceholder;
    return `| [${r.label}](${r.link}) | ${finalDesc} |`;
  }).join('\n');
  return `${header}${body}\n`;
}

async function run() {
  const argv = require('minimist')(process.argv.slice(2));
  const out = path.resolve(process.cwd(), argv.out || argv.o || 'docs/markdown/api');
  const namespaceSummaryByFull = new Map();
  const modulesDir = path.resolve(process.cwd(), argv.modules || argv.m || 'modules');
  const deprecatedNamespaces = await getDeprecatedNamespaces(modulesDir);

  const packageDocs = await extractPackageDocs(modulesDir);
  for (const [ns, desc] of packageDocs) {
    namespaceSummaryByFull.set(ns, desc);
  }
  // Propagate descriptions up to parent namespaces that have no .d.ts of their own
  // e.g. 'overwolf.campaigns' gets the description from 'overwolf.campaigns.crossapp'
  for (const [ns, desc] of packageDocs) {
    const parts = ns.split('.');
    for (let i = parts.length - 1; i >= 2; i--) {
      const parentKey = parts.slice(0, i).join('.');
      if (!namespaceSummaryByFull.has(parentKey)) {
        namespaceSummaryByFull.set(parentKey, desc);
      }
    }
  }

  const all = await listFiles(out);
  const skippedNoNamespace = [];
  const skippedDeprecated = [];

  // Filter MDX files, skip only root-level overview and typedoc readme
  // Include namespace-specific Overview files so every namespace gets a folder
  const cwd = process.cwd();
  const mdxFiles = all.filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .filter(f => {
      const name = path.basename(f).toLowerCase();
      const dir = path.dirname(f);
      const rootOut = path.resolve(cwd, argv.out || argv.o || 'docs/markdown/api');
      const isRootLevel = dir === rootOut;
      const isRootOrReadme = ['typedoc-readme.mdx','typedoc-readme.md'].includes(name) ||
                             (isRootLevel && name === 'overview.mdx');
      return !isRootOrReadme;
    });

  const groups = new Map();

  for (const file of mdxFiles) {
    const content = await fs.readFile(file, 'utf8');
    const ns = detectNamespace(content, file, out);
    if (!ns) {
      skippedNoNamespace.push(path.relative(out, file));
      continue;
    }
    if (isDeprecatedNamespace(ns, deprecatedNamespaces)) {
      skippedDeprecated.push(path.relative(out, file));
      continue;
    }
    const kind = detectKindFromPath(file, out);
    const master = masterNamespace(ns);
    // full namespace to use for per-namespace folders
    const fullNs = (ns || path.basename(file, path.extname(file))).toLowerCase();
    if (!groups.has(master)) groups.set(master, []);
    groups.get(master).push({ file, content, fullNs, kind });
  }

  // Move files into namespace folders
  for (const [ns, items] of groups) {
    const nsDir = path.join(out, ns);
    await ensureDir(nsDir);
    // group into per-namespace subfolders inside the top-level nsDir
    const perNsMap = new Map();
    for (const it of items) {
      // for overwolf.* namespaces, create subpath from parts after 'overwolf'
      const parts = it.fullNs.split('.');
      let subParts = parts;
      if (parts[0] === 'overwolf') subParts = parts.slice(1);
      // avoid duplicate folder like `Profile/profile` — if the first subPart equals the top-level ns, drop it
      if (subParts.length > 0 && subParts[0].toLowerCase() === ns.toLowerCase()) {
        subParts = subParts.slice(1);
      }
      subParts = normalizeSubPartsForGroup(ns, subParts);
      const subFolder = subParts.join('/');
      const baseDir = path.join(nsDir, subFolder || '_root');
      const destDir = it.kind ? path.join(baseDir, it.kind) : baseDir;
      await ensureDir(destDir);
      const origBase = path.basename(it.file, path.extname(it.file));
      if (origBase.toLowerCase() === 'overview') {
        const summary = extractSummaryFromContent(it.content);
        if (summary) namespaceSummaryByFull.set(it.fullNs.toLowerCase(), summary);
      }
      // create a filename that preserves the full namespace: overwolf.foo.bar.symbol
      const safeFull = it.fullNs.replace(/[^a-zA-Z0-9_.]/g, '.');
      const newName = `${safeFull}.${origBase}${path.extname(it.file)}`;
      const dest = path.join(destDir, newName);
      try {
        await fs.rename(it.file, dest);
      } catch (e) {
        await fs.writeFile(dest, it.content, 'utf8');
        await fs.unlink(it.file).catch(()=>{});
      }
      if (!perNsMap.has(destDir)) perNsMap.set(destDir, []);
      perNsMap.get(destDir).push(path.basename(dest));
    }

    // Remove typedoc namespace Overview pages (e.g., overwolf.media.Overview.mdx)
    // These are redundant with our generated Overview.mdx files
    for (const [dirPath, filesList] of perNsMap) {
      const kept = [];
      for (const name of filesList) {
        if (isNamespacedOverview(name)) {
          await fs.rm(path.join(dirPath, name), { force: true });
          continue;
        }
        kept.push(name);
      }
      perNsMap.set(dirPath, kept);
    }

    // create Overview.mdx for each namespace folder
    for (const [dirPath, filesList] of perNsMap) {
      if (isKindFolderName(path.basename(dirPath))) {
        const overviewPath = path.join(dirPath, 'Overview.mdx');
        await fs.rm(overviewPath, { force: true }).catch(() => {});
        continue;
      }
      // Filter to actual member files (not overview files), create links with proper formatting
      const memberFiles = filesList.filter(n => !/^overview(\.mdx|\.md)$/i.test(n) && !isNamespacedOverview(n));
      const rows = [];
      for (const n of memberFiles) {
        const name = n.replace(/(\.mdx|\.md)$/i, '');
        const filePath = path.join(dirPath, n);
        let desc = '';
        try {
          const c = await fs.readFile(filePath, 'utf8');
          desc = extractSummaryFromContent(c);
        } catch { /* ignore */ }
        const relDir = path.relative(out, dirPath);
        const groupName = relDir.split(path.sep)[0] || '';
        const label = normalizeDisplayLabel(groupName, name);
        rows.push({ label, link: `./${n}`, description: desc });
      }
      const nsKey = namespaceKeyForDir(out, dirPath);
      const summary = nsKey ? namespaceSummaryByFull.get(nsKey) : '';
      const overview = buildOverviewTable(rows, { summary });
      await fs.writeFile(path.join(dirPath, 'Overview.mdx'), overview, 'utf8');
    }
  }

  console.log('Organized MDX into', groups.size, 'namespaces at', out);
  if (skippedNoNamespace.length) {
    console.log('Skipped files with no detected namespace:', skippedNoNamespace.join(', '));
  }
  if (skippedDeprecated.length) {
    console.log('Skipped files in deprecated namespaces:', skippedDeprecated.join(', '));
  }
  // Cleanup: remove any leftover directories created by typedoc that begin with 'overwolf.'
  const rootEntries = await fs.readdir(out, { withFileTypes: true });
  for (const e of rootEntries) {
    if (e.isDirectory() && e.name.toLowerCase().startsWith('overwolf.')) {
      const full = path.join(out, e.name);
      await fs.rm(full, { recursive: true, force: true });
      console.log('Removed legacy folder', e.name);
    }
  }

  // Create _category_.json files for each top-level folder, position ascending starting at 4
  const topDirs = (await fs.readdir(out, { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a,b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  let pos = 4;
  for (const d of topDirs) {
    const cat = {
      label: d,
      position: pos
    };
    const target = path.join(out, d, '_category_.json');
    try {
      await fs.writeFile(target, JSON.stringify(cat, null, 2), 'utf8');
      console.log('Wrote', target);
    } catch (e) {
      console.error('Failed to write category for', d, e);
    }
    pos++;
  }

  // Flatten any child directory whose name equals its parent (case-insensitive)
  async function flattenDuplicates(root) {
    const entries = await fs.readdir(root, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const childPath = path.join(root, e.name);
      const childEntries = await fs.readdir(childPath, { withFileTypes: true });
      for (const ce of childEntries) {
        if (!ce.isDirectory()) continue;
        if (ce.name.toLowerCase() === e.name.toLowerCase()) {
          // move contents up from childPath/ce.name to childPath
          const dupPath = path.join(childPath, ce.name);
          const dupContents = await fs.readdir(dupPath);
          for (const item of dupContents) {
            const src = path.join(dupPath, item);
            const dest = path.join(childPath, item);
            await fs.rename(src, dest).catch(async () => {
              // fallback: if src is directory, copy recursively; otherwise copy file
              const st = await fs.lstat(src);
              if (st.isDirectory()) {
                // copy recursively then remove src
                await fs.cp(src, dest, { recursive: true });
                await fs.rm(src, { recursive: true, force: true });
              } else {
                const data = await fs.readFile(src);
                await fs.writeFile(dest, data);
                await fs.unlink(src).catch(()=>{});
              }
            });
          }
          // remove the now-empty duplicate folder
          await fs.rm(dupPath, { recursive: true, force: true });
          console.log('Flattened duplicate folder', dupPath);
        }
      }
      // recurse
      await flattenDuplicates(childPath);
    }
  }

  await flattenDuplicates(out);

  // Remove any '_root' folders created for items with no sub-namespace and move their contents up
  const topLevel = await fs.readdir(out, { withFileTypes: true });
  for (const t of topLevel) {
    if (!t.isDirectory()) continue;
    const nsPath = path.join(out, t.name);
    const rootPath = path.join(nsPath, '_root');
    try {
      const stat = await fs.lstat(rootPath).catch(()=>null);
      if (!stat) continue;
      // move contents of rootPath up to nsPath
      const items = await fs.readdir(rootPath);
      for (const item of items) {
        const src = path.join(rootPath, item);
        const dest = path.join(nsPath, item);
        await fs.rename(src, dest).catch(async () => {
          const sst = await fs.lstat(src);
          if (sst.isDirectory()) {
            await fs.cp(src, dest, { recursive: true });
            await fs.rm(src, { recursive: true, force: true });
          } else {
            const data = await fs.readFile(src);
            await fs.writeFile(dest, data);
            await fs.unlink(src).catch(()=>{});
          }
        });
      }
      // remove empty _root
      await fs.rm(rootPath, { recursive: true, force: true });
      console.log('Flattened _root in', nsPath);
    } catch (e) {
      // ignore
    }
  }

  // Ensure each top-level group has an Overview.mdx that links to its subfolders/files
  async function writeGroupOverviews(outDir) {
    const topDirs = (await fs.readdir(outDir, { withFileTypes: true }))
      .filter(d => d.isDirectory());
    for (const d of topDirs) {
      const groupPath = path.join(outDir, d.name);
      const entries = await fs.readdir(groupPath, { withFileTypes: true });
      const subdirs = entries.filter(e => e.isDirectory());
      const files = entries.filter(e => e.isFile() && /\.mdx?$/i.test(e.name) && e.name.toLowerCase() !== 'overview.mdx');

      const rows = [];
      for (const sd of subdirs) {
        const overviewPath = path.join(groupPath, sd.name, 'Overview.mdx');
        if (isKindFolderName(sd.name)) {
          const kindDir = path.join(groupPath, sd.name);
          try {
            const kindEntries = await fs.readdir(kindDir, { withFileTypes: true });
            for (const ke of kindEntries) {
              if (!ke.isFile() || !/\.mdx?$/i.test(ke.name)) continue;
              if (ke.name.toLowerCase() === 'overview.mdx') continue;
              const base = ke.name.replace(/(\.mdx|\.md)$/i, '');
              const filePath = path.join(kindDir, ke.name);
              let desc = '';
              try {
                const c = await fs.readFile(filePath, 'utf8');
                desc = extractSummaryFromContent(c);
              } catch { /* ignore */ }
              const label = normalizeDisplayLabel(d.name, base);
              rows.push({ label, link: `./${sd.name}/${base}`, description: desc });
            }
          } catch { /* ignore */ }
          continue;
        }
        // Skip empty folders (no MDX pages or only an empty Overview)
        let hasContent = false;
        const subNsRows = [];
        try {
          const subEntries = await fs.readdir(path.join(groupPath, sd.name), { withFileTypes: true });
          const mdxFiles = subEntries.filter(e => e.isFile() && /\.mdx?$/i.test(e.name));
          const nonOverview = mdxFiles.filter(e => e.name.toLowerCase() !== 'overview.mdx');
          if (nonOverview.length > 0) {
            hasContent = true;
          } else {
            // Check kind subdirs (Functions/, Interfaces/, etc.) for content
            const kindSubdirs = subEntries.filter(e => e.isDirectory() && isKindFolderName(e.name));
            for (const ksd of kindSubdirs) {
              const kindDir = path.join(groupPath, sd.name, ksd.name);
              try {
                const kindEntries = await fs.readdir(kindDir, { withFileTypes: true });
                for (const ke of kindEntries) {
                  if (!ke.isFile() || !/\.mdx?$/i.test(ke.name)) continue;
                  if (ke.name.toLowerCase() === 'overview.mdx') continue;
                  hasContent = true;
                  const base = ke.name.replace(/(\.mdx|\.md)$/i, '');
                  const filePath = path.join(kindDir, ke.name);
                  let desc = '';
                  try {
                    const c = await fs.readFile(filePath, 'utf8');
                    desc = extractSummaryFromContent(c);
                  } catch { /* ignore */ }
                  subNsRows.push({ label: base, link: `./${ksd.name}/${base}`, description: desc });
                }
              } catch { /* ignore */ }
            }
            if (!hasContent && mdxFiles.length > 0) {
              const c = await fs.readFile(overviewPath, 'utf8').catch(() => '');
              if (!/no pages generated/i.test(c)) hasContent = true;
            }
          }
        } catch { /* ignore */ }
        if (!hasContent) continue;

        // Write Overview for sub-namespace if its content lives in kind subdirs
        if (subNsRows.length > 0) {
          const subNsKey = namespaceKeyFromParts([d.name, sd.name]);
          const subNsSummary = subNsKey ? namespaceSummaryByFull.get(subNsKey) : '';
          const subOverview = buildOverviewTable(subNsRows, { summary: subNsSummary });
          await fs.writeFile(overviewPath, subOverview, 'utf8');
        }

        const label = labelForSubdir(d.name, sd.name);
        if (label !== sd.name) {
          const catPath = path.join(groupPath, sd.name, '_category_.json');
          try {
            await fs.writeFile(catPath, JSON.stringify({ label }, null, 2), 'utf8');
          } catch { /* ignore */ }
        }

        let target = `./${sd.name}`;
        try { await fs.access(overviewPath); target = `./${sd.name}/Overview`; } catch { /* ignore */ }
        const nsKey = namespaceKeyFromParts([d.name, sd.name]);
        let desc = nsKey ? namespaceSummaryByFull.get(nsKey) : '';
        if (!desc) {
          try {
            const c = await fs.readFile(overviewPath, 'utf8');
            desc = extractSummaryFromContent(c);
          } catch { /* ignore */ }
        }
        rows.push({ label, link: target, description: desc });
      }
      for (const f of files) {
        const base = f.name.replace(/(\.mdx|\.md)$/i, '');
        const filePath = path.join(groupPath, f.name);
        let desc = '';
        try {
          const c = await fs.readFile(filePath, 'utf8');
          desc = extractSummaryFromContent(c);
        } catch { /* ignore */ }
        const label = normalizeDisplayLabel(d.name, base);
        rows.push({ label, link: `./${base}`, description: desc });
      }

      const nsKey = namespaceKeyFromParts([d.name]);
      const summary = nsKey ? namespaceSummaryByFull.get(nsKey) : '';
      const overview = buildOverviewTable(rows, { summary });
      await fs.writeFile(path.join(groupPath, 'Overview.mdx'), overview, 'utf8');
    }
  }

  await writeGroupOverviews(out);

  // Root overview with list of namespaces and descriptions
  const topDirsForRoot = (await fs.readdir(out, { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a,b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const namespaceRows = [];
  for (const ns of topDirsForRoot) {
    const nsKey = namespaceKeyFromParts([ns]);
    const desc = nsKey ? (namespaceSummaryByFull.get(nsKey) || '') : '';
    const label = nsKey || ns;
    namespaceRows.push({ label, link: `./${ns}/Overview`, description: desc });
  }

  const rootOverview = buildOverviewTable(namespaceRows, { emptyPlaceholder: '' });
  await fs.writeFile(path.join(out, 'Overview.mdx'), rootOverview, 'utf8');
}

run().catch(err => { console.error(err); process.exit(1); });
