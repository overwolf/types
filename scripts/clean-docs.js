#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const out = process.argv[2] || path.join(process.cwd(), 'docs', 'markdown', 'api');
try {
  if (fs.existsSync(out)) {
    fs.rmSync(out, { recursive: true, force: true });
    console.log('Removed', out);
  } else {
    console.log('No docs to remove at', out);
  }
} catch (e) {
  console.error('Failed to remove', out, e);
  process.exitCode = 1;
}
