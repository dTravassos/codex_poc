import http from 'http';
import { config } from './config/env';
import { prisma } from './lib/prisma';

;(async () => {
  try {
    await prisma.$connect();
    console.log('[api] Database connected');
  } catch (err) {
    console.error('[api] Database connection failed', err);
    process.exit(1);
  }
})();

const server = http.createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', port: config.PORT }));
});

server.listen(config.PORT, () => {
  console.log(`[api] running on :${config.PORT} (${config.NODE_ENV})`);
});
