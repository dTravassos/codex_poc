import 'dotenv/config'
import { z } from 'zod'

const Schema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(10).default('change_me_dev_only'),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  CSRF_ENABLED: z.coerce.boolean().default(true),
  JWT_SECRET: z.string().min(10).default('change_me_dev_only'),
  JWT_EXPIRES_IN: z.string().default('2h'),
  APP_LOCALE: z.string().default('pt-BR'),
  APP_TIMEZONE: z.string().default('America/Sao_Paulo'),
})

const parsed = Schema.safeParse(process.env)
if (!parsed.success) {
  console.error('Invalid env config:', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const config = parsed.data
