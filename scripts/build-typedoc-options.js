#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function hasTopDeprecated(content) {
  const trimmed = content.replace(/^\uFEFF/, '');
  const match = trimmed.match(/^\s*\/\*\*[\s\S]*?\*\//);
  if (!match) return false;
  return /@deprecated\b/i.test(match[0]);
}

function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function resolveMaybeRelative(cwd, value) {
  if (!value || typeof value !== 'string') return value;
  if (path.isAbsolute(value)) return value;
  return path.resolve(cwd, value);
}

function toPosixPath(p) {
  if (!p || typeof p !== 'string') return p;
  return p.replace(/\\/g, '/');
}

function normalizePluginEntries(cwd, plugins) {
  if (!Array.isArray(plugins)) return plugins;
  return plugins.map(p => {
    if (typeof p !== 'string') return p;
    // Only resolve local filesystem paths; leave package names as-is.
    if (p.startsWith('.') || p.includes('/') || p.includes('\\')) {
      return toPosixPath(path.resolve(cwd, p));
    }
    return p;
  });
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function buildTempTsconfig(baseTsconfigPath, entryPoints, outPath) {
  let base = {};
  try {
    base = loadJson(baseTsconfigPath) || {};
  } catch {
    base = {};
  }
  const compilerOptions = base.compilerOptions || {};
  const files = entryPoints.map(p => toPosixPath(path.resolve(p)));
  const temp = {
    compilerOptions,
    files,
    exclude: [],
  };
  writeJson(outPath, temp);
}

function run() {
  const argv = require('minimist')(process.argv.slice(2));
  const cwd = process.cwd();
  const inPath = path.resolve(cwd, argv.in || argv.i || 'typedoc.mdx.json');
  const outPath = path.resolve(cwd, argv.out || argv.o || path.join('temp_typedoc', 'typedoc.mdx.json'));
  const modulesDir = path.resolve(cwd, argv.modules || argv.m || 'modules');

  const opts = loadJson(inPath);
  const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.d.ts'));
  const entryPoints = [];
  const skipped = [];

  for (const f of files) {
    const full = path.join(modulesDir, f);
    const content = fs.readFileSync(full, 'utf8');
    if (hasTopDeprecated(content)) {
      skipped.push(f);
      continue;
    }
    entryPoints.push(`./modules/${f}`);
  }

  entryPoints.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  const root = './modules/overwolf.d.ts';
  if (entryPoints.includes(root)) {
    const rest = entryPoints.filter(p => p !== root);
    entryPoints.length = 0;
    entryPoints.push(root, ...rest);
  }

  if (!entryPoints.length) {
    console.error('No entryPoints left after filtering deprecated modules.');
    process.exit(1);
  }

  const resolvedEntryPoints = entryPoints.map(p => toPosixPath(path.resolve(cwd, p)));
  opts.entryPoints = resolvedEntryPoints;
  const baseTsconfig = resolveMaybeRelative(cwd, opts.tsconfig);
  const tempTsconfigPath = path.resolve(path.dirname(outPath), 'tsconfig.json');
  buildTempTsconfig(baseTsconfig, resolvedEntryPoints, tempTsconfigPath);
  opts.tsconfig = toPosixPath(tempTsconfigPath);
  opts.out = toPosixPath(resolveMaybeRelative(cwd, opts.out));
  opts.readme = toPosixPath(resolveMaybeRelative(cwd, opts.readme));
  opts.plugin = normalizePluginEntries(cwd, opts.plugin);
  writeJson(outPath, opts);

  console.log(`Wrote TypeDoc options to ${outPath}`);
  if (skipped.length) {
    console.log(`Skipped deprecated modules: ${skipped.join(', ')}`);
  }
}

run();
