/**
 * Rate Limit Configuration Module.
 * Configures the Fastify Rate Limiting plugin to prevent abuse and brute-force attacks,
 * reading thresholds and intervals dynamically from the environment.
 * @module config/rate-limit.config
 */
import { z } from 'zod';
import { validateEnv } from './env-validator';

/**
 * Zod schema expressing the required constraints for Rate Limiting environment variables.
 */
const envSchema = z.object({
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW: z.string().default('1 minute'),
});

/**
 * Inferred TypeScript type derived from the environment schema.
 */
export type RateLimitConfigType = z.infer<typeof envSchema>;

/**
 * Validated instance of the Rate Limiting environment variables.
 */
const rateLimitEnv = validateEnv<RateLimitConfigType>(envSchema);

/**
 * The configuration object exported for the Fastify Rate Limit plugin registration.
 */
export const rateLimitConfig = {
  max: rateLimitEnv.RATE_LIMIT_MAX,
  timeWindow: rateLimitEnv.RATE_LIMIT_WINDOW,
};

export default rateLimitEnv;
