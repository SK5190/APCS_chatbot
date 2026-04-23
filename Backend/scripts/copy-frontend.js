'use strict';

const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../../Frontend/dist');
const dest = path.resolve(__dirname, '../public/app');

if (!fs.existsSync(path.join(src, 'index.html'))) {
  console.error('[copy-frontend] Missing:', path.join(src, 'index.html'));
  console.error('Run: cd Frontend && npm run build');
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log('[copy-frontend] Copied UI to', dest);
