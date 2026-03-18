/**
 * Core Application Configuration Module.
 * Responsible for defining and validating the environment variables needed for the Web Server/API.
 * @module config/app.config
 */
import { z } from 'zod';
import { validateEnv } from './env-validator';

/**
 * Zod schema expressing the required constraints for the Application level Environment Variables.
 */
const envSchema = z.object({
  APP_ENV: z.enum(['development', 'production']).default('development'),
  APP_PORT: z.coerce.number().default(4000),
  APP_LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

/**
 * Inferred TypeScript type derived from the environment schema.
 */
export type AppConfigType = z.infer<typeof envSchema>;

/**
 * Validated and securely typed instance of the application configuration.
 * Imported centrally across the project whenever app settings (e.g., ports) are needed.
 */
export default validateEnv<AppConfigType>(envSchema);
