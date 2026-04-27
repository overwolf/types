'use strict';
const fs = require('fs');

function braceBalance(src) {
  const clean = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
  const opens  = (clean.match(/\{/g) || []).length;
  const closes = (clean.match(/\}/g) || []).length;
  return { opens, closes, balance: opens - closes };
}

function stripAndNormalize(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l !== '');
}

const newFile = fs.readFileSync('overwolf.d.ts', 'utf8');
const oldFile = fs.readFileSync('overwolf-old.d.ts', 'utf8');

console.log('NEW brace balance:', JSON.stringify(braceBalance(newFile)));
console.log('OLD brace balance:', JSON.stringify(braceBalance(oldFile)));

// Find actual content diffs (ignore indentation, ignore comment-only lines)
const newLines = stripAndNormalize(newFile);
const oldLines = stripAndNormalize(oldFile);

// Build a set of lines unique to each file
const newSet = new Set(newLines);
const oldSet = new Set(oldLines);

const onlyInNew = newLines.filter(l => !oldSet.has(l));
const onlyInOld = oldLines.filter(l => !newSet.has(l));

console.log('\nLines only in NEW (not in OLD):');
onlyInNew.forEach(l => console.log('  + ' + l));

console.log('\nLines only in OLD (not in NEW):');
onlyInOld.forEach(l => console.log('  - ' + l));
