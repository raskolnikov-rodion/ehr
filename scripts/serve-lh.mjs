/**
 * Minimal static server for Lighthouse CI with on-the-fly gzip compression.
 * Uses only Node.js built-ins — no extra dependencies.
 * SPA fallback: any path that doesn't match a file is served as index.html.
 */
import { createServer } from 'http';
import { createReadStream, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';

const DIST = 'dist/apps/EHR';
const PORT = 4200;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff':  'font/woff',
  '.ttf':   'font/ttf',
};

const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg']);

createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = join(DIST, urlPath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(DIST, 'index.html');
  }

  const ext = extname(filePath);
  res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');

  const acceptsGzip = req.headers['accept-encoding']?.includes('gzip');
  if (acceptsGzip && COMPRESSIBLE.has(ext)) {
    res.setHeader('Content-Encoding', 'gzip');
    pipeline(createReadStream(filePath), createGzip(), res, () => {});
  } else {
    pipeline(createReadStream(filePath), res, () => {});
  }
}).listen(PORT, () => {
  console.log(`Available on http://localhost:${PORT}`);
});
