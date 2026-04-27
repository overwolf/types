#!/usr/bin/env node
/**
 * Combines all modules/*.d.ts files into a single overwolf.d.ts for npm distribution.
 *
 * The module files form a chain: each file is a raw slice of the original combined
 * file with a @packageDocumentation JSDoc header prepended. Recombining simply
 * concatenates the slices in order and removes those headers.
 *
 * File order is auto-detected by matching the first `declare namespace X` in each
 * file against the namespace order in overwolf.d.ts.old (the reference). If the
 * reference file is absent, falls back to alphabetical-by-namespace.
 *
 * Usage:
 *   node ./scripts/recombine-ts.js
 *   node ./scripts/recombine-ts.js --verify   (diff output against overwolf.d.ts.old)
 */
'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT        = process.cwd();
const MODULES_DIR = path.join(ROOT, 'modules');
const OUT_FILE    = path.join(ROOT, 'overwolf.d.ts');
const REF_FILE    = path.join(ROOT, 'overwolf-old.d.ts');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Return the name of the first top-level `declare namespace X` in content.
 * "Top-level" means the declaration starts at column 0.
 */
function getPrimaryNamespace(content) {
  const m = content.match(/^declare namespace ([\w.]+)/m);
  return m ? m[1] : null;
}

/**
 * Strip the @packageDocumentation JSDoc block from a SINGLE file's content.
 *
 * Uses string-position search (not regex on combined output) so there is zero
 * risk of accidentally consuming content from neighbouring files.
 *
 * Two layouts exist across the module files:
 *  A) Block at top of file   – most files
 *  B) Block mid-file before `declare namespace` – overwolf.extensions.sharedData
 *
 * The `* /` (space) variant of the closing marker is handled for overwolf.io.
 */
function stripPackageDoc(content) {
  const MARKER = '@packageDocumentation';
  const markerPos = content.indexOf(MARKER);
  if (markerPos === -1) return content;

  // Walk backwards to find the /** that opens this specific block
  const openPos = content.lastIndexOf('/**', markerPos);
  if (openPos === -1) return content;

  // Walk forwards to find */ or * / (typo variant) that closes the block
  const standardClose = content.indexOf('*/', markerPos);
  const spaceClose    = content.indexOf('* /', markerPos);

  let closeEnd;
  if (standardClose !== -1 && (spaceClose === -1 || standardClose <= spaceClose)) {
    closeEnd = standardClose + 2;           // step past  */
  } else if (spaceClose !== -1) {
    closeEnd = spaceClose + 3;              // step past  * /
  } else {
    return content;                         // no closing found — leave untouched
  }

  // Consume the rest of the closing line (spaces/tabs) then one newline
  while (closeEnd < content.length &&
         (content[closeEnd] === ' ' || content[closeEnd] === '\t')) closeEnd++;
  if (content[closeEnd] === '\n') closeEnd++;

  return content.slice(0, openPos) + content.slice(closeEnd);
}

/**
 * Read overwolf.d.ts.old and return the ordered list of namespace names as
 * they appear in that file, deduplicated. Used as the sort key.
 */
/** Hardcoded fallback order derived from the original combined file (commit be1a036). */
const HARDCODED_ORDER = [
  'overwolf',
  'overwolf.io',
  'overwolf.cryptography',
  'overwolf.media',
  'overwolf.media.videos',
  'overwolf.media.replays',
  'overwolf.notifications',
  'overwolf.profile',
  'overwolf.profile.subscriptions.inapp',
  'overwolf.profile.subscriptions',
  'overwolf.windows',
  'overwolf.windows.mediaPlayerElement',
  'overwolf.benchmarking',
  'overwolf.games',
  'overwolf.games.tracked',
  'overwolf.games.launchers',
  'overwolf.games.launchers.events',
  'overwolf.games.launchers.events.provider',
  'overwolf.games.events.provider',
  'overwolf.web',
  'overwolf.logitech',
  'overwolf.logitech.led',
  'overwolf.streaming',
  'overwolf.log',
  'overwolf.os',
  'overwolf.os.tray',
  'overwolf.extensions',
  'overwolf.extensions.io',
  'overwolf.extensions.sharedData',
  'overwolf.campaigns.crossapp',
  'overwolf.utils',
  'overwolf.settings',
  'overwolf.settings.games',
  'overwolf.settings.hotkeys',
  'overwolf.settings.language',
  'overwolf.social',
  'overwolf.social.discord',
  'overwolf.social.gfycat',
  'overwolf.social.twitter',
  'overwolf.social.youtube',
  'overwolf.social.reddit',
  'overwolf.gep',
];

function loadRefOrder() {
  if (!fs.existsSync(REF_FILE)) {
    console.log('overwolf.d.ts.old not found — using hardcoded namespace order.');
    return HARDCODED_ORDER;
  }
  const src = fs.readFileSync(REF_FILE, 'utf8');
  const order = [];
  const re = /^declare namespace ([\w.]+)/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (!order.includes(m[1])) order.push(m[1]);
  }
  return order;
}

// ---------------------------------------------------------------------------
// Brace-balance fixer
// ---------------------------------------------------------------------------

/**
 * Scans combined TypeScript source character-by-character, tracking brace
 * depth while skipping comments and string literals.  Any `}` that would
 * reduce depth below 0 is a stray brace left over from a split boundary and
 * is silently dropped.
 */
function fixBraceImbalance(src) {
  let result = '';
  let i = 0;
  let depth = 0;
  let removed = 0;

  while (i < src.length) {
    const ch = src[i];

    // Line comment — copy verbatim to end of line
    if (ch === '/' && src[i + 1] === '/') {
      const end = src.indexOf('\n', i);
      if (end === -1) { result += src.slice(i); break; }
      result += src.slice(i, end + 1);
      i = end + 1;
      continue;
    }

    // Block comment — copy verbatim to */
    if (ch === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      if (end === -1) { result += src.slice(i); break; }
      result += src.slice(i, end + 2);
      i = end + 2;
      continue;
    }

    // Single- or double-quoted string literal
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === '\\') { j += 2; continue; }
        if (src[j] === quote) { j++; break; }
        j++;
      }
      result += src.slice(i, j);
      i = j;
      continue;
    }

    // Template literal
    if (ch === '`') {
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === '\\') { j += 2; continue; }
        if (src[j] === '`') { j++; break; }
        j++;
      }
      result += src.slice(i, j);
      i = j;
      continue;
    }

    if (ch === '{') { depth++; result += ch; i++; continue; }

    if (ch === '}') {
      if (depth === 0) { removed++; i++; continue; } // stray — drop it
      depth--;
      result += ch;
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  if (removed > 0) console.log(`Removed ${removed} stray closing brace(s).`);
  if (depth  > 0) console.warn(`Warning: ${depth} unclosed brace(s) remain after fixup.`);
  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function run() {
  const argv   = require('minimist')(process.argv.slice(2));
  const verify = argv.verify || argv.v;

  const refOrder = loadRefOrder();

  // -------------------------------------------------------------------------
  // 1. Read every .d.ts in modules/, strip BOM, detect primary namespace
  // -------------------------------------------------------------------------
  const allFiles = fs.readdirSync(MODULES_DIR).filter(f => f.endsWith('.d.ts'));

  const fileData = allFiles.map(f => {
    const raw = fs.readFileSync(path.join(MODULES_DIR, f), 'utf8');
    const content = raw.replace(/^﻿/, ''); // strip UTF-8 BOM
    const ns = getPrimaryNamespace(content);
    return { file: f, content, ns };
  });

  // -------------------------------------------------------------------------
  // 2. Sort by reference order; root namespace always first
  // -------------------------------------------------------------------------
  fileData.sort((a, b) => {
    if (a.ns === 'overwolf') return -1;
    if (b.ns === 'overwolf') return  1;

    const ia = refOrder.indexOf(a.ns);
    const ib = refOrder.indexOf(b.ns);
    if (ia === -1 && ib === -1) return (a.ns || '').localeCompare(b.ns || '');
    if (ia === -1) return  1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  console.log('\nModule order:');
  fileData.forEach((d, i) =>
    console.log(`  ${String(i + 1).padStart(2)}. ${d.file.padEnd(52)} → ${d.ns || '(unknown)'}`)
  );

  // -------------------------------------------------------------------------
  // 3. Strip @packageDocumentation from each file individually, then concatenate.
  //    Per-file stripping avoids the cross-file regex contamination that would
  //    occur if we stripped on the already-joined string.
  // -------------------------------------------------------------------------
  let combined = fileData.map(d => stripPackageDoc(d.content)).join('');

  // -------------------------------------------------------------------------
  // 4. Normalise: collapse 3+ consecutive blank lines down to 2
  // -------------------------------------------------------------------------
  combined = combined.replace(/\n{3,}/g, '\n\n');

  // -------------------------------------------------------------------------
  // 5. Fix brace imbalance — drop stray `}` left over from split boundaries
  // -------------------------------------------------------------------------
  combined = fixBraceImbalance(combined);

  // Ensure file ends with a single newline
  combined = combined.trimEnd() + '\n';

  // -------------------------------------------------------------------------
  // 6. Write output
  // -------------------------------------------------------------------------
  fs.writeFileSync(OUT_FILE, combined, 'utf8');
  const lineCount = combined.split('\n').length;
  console.log(`\nWrote ${lineCount} lines → ${path.relative(ROOT, OUT_FILE)}`);

  // -------------------------------------------------------------------------
  // 7. TypeScript validation — report any errors in the generated file
  // -------------------------------------------------------------------------
  validateOutput();

  // -------------------------------------------------------------------------
  // 8. Optional verification against overwolf.d.ts.old
  // -------------------------------------------------------------------------
  if (verify) {
    verifyOutput(combined);
  }
}

function validateOutput() {
  const { spawnSync } = require('child_process');
  const outName = path.basename(OUT_FILE);

  console.log('\nRunning TypeScript validation…');

  const result = spawnSync(
    'npx',
    ['tsc', '--noEmit', '--target', 'ES2018', '--lib', 'ES2018,DOM', outName],
    { cwd: ROOT, encoding: 'utf8' }
  );

  const raw = (result.stdout || '') + (result.stderr || '');
  // Only surface errors that belong to our generated file, not node_modules/lib
  const ourErrors = raw
    .split('\n')
    .filter(line => line.startsWith(outName + '('));

  if (ourErrors.length > 0) {
    console.error(`TypeScript validation FAILED — ${ourErrors.length} error(s):`);
    ourErrors.forEach(line => console.error('  ' + line));
    process.exitCode = 1;
  } else {
    console.log('TypeScript validation passed ✓');
  }
}

function verifyOutput(combined) {
  if (!fs.existsSync(REF_FILE)) {
    console.log('No reference file to verify against.');
    return;
  }

  const ref = fs.readFileSync(REF_FILE, 'utf8');

  // Normalise both sides: CRLF → LF, trailing spaces on each line, then trim
  const normalize = s =>
    s.replace(/\r\n/g, '\n')
     .replace(/[ \t]+$/gm, '')
     .replace(/\n{3,}/g, '\n\n')
     .trim();

  const normOut = normalize(combined);
  const normRef = normalize(ref);

  if (normOut === normRef) {
    console.log('\n✓  Output matches reference (overwolf.d.ts.old) exactly.');
    return;
  }

  const outLines = normOut.split('\n');
  const refLines = normRef.split('\n');

  let firstDiff = -1;
  for (let i = 0; i < Math.max(outLines.length, refLines.length); i++) {
    if (outLines[i] !== refLines[i]) { firstDiff = i; break; }
  }

  console.warn('\n✗  Output differs from reference.');
  if (firstDiff >= 0) {
    const ctx = 3;
    const start = Math.max(0, firstDiff - ctx);
    const end   = Math.min(Math.max(outLines.length, refLines.length), firstDiff + ctx + 1);
    console.warn(`  First difference at line ${firstDiff + 1}:`);
    for (let i = start; i < end; i++) {
      const marker = i === firstDiff ? '>>>' : '   ';
      const got  = outLines[i] !== undefined ? JSON.stringify(outLines[i]) : '(missing)';
      const want = refLines[i] !== undefined ? JSON.stringify(refLines[i]) : '(missing)';
      if (outLines[i] !== refLines[i]) {
        console.warn(`  ${marker} got:  ${got}`);
        console.warn(`       want: ${want}`);
      } else {
        console.warn(`  ${marker} ${got}`);
      }
    }
  }
  console.warn(`  Output: ${outLines.length} lines | Reference: ${refLines.length} lines`);
}

run();
