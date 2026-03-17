/**
 * CORS Configuration Module.
 * Defines the Cross-Origin Resource Sharing (CORS) rules for the Fastify server,
 * reading constraints dynamically from environment variables using Zod validation.
 * @module config/cors.config
 */
import { z } from 'zod';
import { validateEnv } from './env-validator';

/**
 * Zod schema expressing the required constraints for CORS environment variables.
 */
const envSchema = z.object({
  CORS_ORIGIN: z.string().default('*'),
  CORS_METHODS: z.array(z.string()).default(['POST', 'OPTIONS']),
  CORS_ALLOWED_HEADERS: z.array(z.string()).default(['*']),
  CORS_EXPOSED_HEADERS: z.array(z.string()).default(['*']),
  CORS_MAX_AGE: z.coerce.number().default(60 * 60 * 24),
});

/**
 * Inferred TypeScript type derived from the environment schema.
 */
export type CorsConfigType = z.infer<typeof envSchema>;

/**
 * Validated instance of the CORS environment variables.
 */
const corsEnv = validateEnv<CorsConfigType>(envSchema);

/**
 * The configuration object exported for the Fastify CORS plugin registration.
 */
export const corsConfig = {
  origin: corsEnv.CORS_ORIGIN,
  methods: corsEnv.CORS_METHODS,
  allowedHeaders: corsEnv.CORS_ALLOWED_HEADERS,
  exposedHeaders: corsEnv.CORS_EXPOSED_HEADERS,
  maxAge: corsEnv.CORS_MAX_AGE,
};

export default corsEnv;
