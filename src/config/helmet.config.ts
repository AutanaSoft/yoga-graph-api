/**
 * Helmet Security Configuration Module.
 * Defines HTTP header security settings via Fastify Helmet, enforcing
 * rules like Content Security Policy (CSP) depending on the environment.
 * @module config/helmet.config
 */
import { z } from 'zod';
import { validateEnv } from './env-validator';
import appConfig from './app.config';

/**
 * Zod schema expressing the required constraints for Helmet environment variables.
 */
const envSchema = z.object({
  HELMET_ENABLE_CSP: z.coerce.boolean().default(false),
});

/**
 * Inferred TypeScript type derived from the environment schema.
 */
export type HelmetConfigType = z.infer<typeof envSchema>;

/**
 * Validated instance of the Helmet environment variables.
 */
const helmetEnv = validateEnv<HelmetConfigType>(envSchema);

/**
 * The configuration object exported for the Fastify Helmet plugin registration.
 * CSP is strict inside production environments depending on the HELMET_ENABLE_CSP flag.
 */
export const helmetConfig = {
  contentSecurityPolicy: appConfig.APP_ENV === 'production' ? helmetEnv.HELMET_ENABLE_CSP : false,
};

export default helmetEnv;
