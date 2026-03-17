import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().min(10).default('super-secret-default-key-change-me'),
});

export const env = envSchema.parse(process.env);
