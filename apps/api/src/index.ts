import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { config } from './config/env';
import authRoutes from './routes/auth';
import { prisma } from './lib/prisma';
const app = express();

app.use('/auth', authRoutes);
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: config.COOKIE_SECURE },
  }),
);

;(async () => {
  try {
    await prisma.$connect();
    console.log('[api] Database connected');
  } catch (err) {
    console.error('[api] Database connection failed', err);
    process.exit(1);
  }
})();

app.get('/', (_, res) => {
  res.json({ status: 'ok', port: config.PORT });
});

app.listen(config.PORT, () => {
  console.log(`[api] running on :${config.PORT} (${config.NODE_ENV})`);
});
