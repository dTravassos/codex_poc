import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config/env';

export interface AuthRequest extends Request {
  user?: jwt.JwtPayload | string;
}

export default function auth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
