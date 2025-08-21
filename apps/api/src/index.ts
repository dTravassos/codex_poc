import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import { config } from './config/env';
import authRoutes from './routes/auth';

const app = express();

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

app.use('/auth', authRoutes);

app.get('/', (_, res) => {
  res.json({ status: 'ok', port: config.PORT });
});

app.listen(config.PORT, () => {
  console.log(`[api] running on :${config.PORT} (${config.NODE_ENV})`);
});
