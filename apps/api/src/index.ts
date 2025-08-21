import http from 'http';
import { config } from './config/env';

const server = http.createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', port: config.PORT }));
});

server.listen(config.PORT, () => {
  console.log(`[api] running on :${config.PORT} (${config.NODE_ENV})`);
});
