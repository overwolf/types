const fs = require('fs').promises;
const path = require('path');

async function inspect(file) {
  const content = await fs.readFile(file, 'utf8');
  console.log('\n==', file, '==');
  const nsMatch = content.match(/Namespace[:\\s`]*([a-z0-9_.]+)/i);
  console.log('Namespace header match:', nsMatch && nsMatch[1]);
  const ow = content.match(/overwolf(?:\\.[a-z0-9_]+){1,}/ig);
  console.log('Overwolf matches in content:', ow);
  const linkLabels = [];
  const linkRe = /\[([^\]]+)\]\([^\)]+\)/g;
  let m;
  const head = content.slice(0, 3 * 1024);
  while ((m = linkRe.exec(head))) linkLabels.push(m[1]);
  console.log('Link labels (first 3KB):', linkLabels);
}

async function run() {
  const dir = path.join(process.cwd(), 'docs', 'markdown', 'api', 's');
  const files = await fs.readdir(dir);
  for (const f of ['capture.mdx','startCapture.mdx','StartCaptureResult.mdx','StreamParams.mdx']) {
    if (files.includes(f)) await inspect(path.join(dir, f));
  }
}

run().catch(e=>{ console.error(e); process.exit(1); });
