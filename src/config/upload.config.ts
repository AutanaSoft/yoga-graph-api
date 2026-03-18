/**
 * Upload System Configuration Module.
 * Defines the physical storage paths and the public HTTP routes used by
 * the server for handling static files and uploads.
 * @module config/upload.config
 */
import { z } from 'zod';
import { validateEnv } from './env-validator';
import { join } from 'path';

/**
 * Zod schema expressing the required constraints for Upload configurations.
 */
const envSchema = z.object({
  UPLOAD_DIR: z.string().default('uploads'),
  UPLOAD_ROUTE: z.string().default('/uploads/'),
});

/**
 * Inferred TypeScript type derived from the environment schema.
 */
export type UploadConfigType = z.infer<typeof envSchema>;

/**
 * Validated instance of the Upload environment variables.
 */
const uploadEnv = validateEnv<UploadConfigType>(envSchema);

/**
 * The configuration object exported for registering the Fastify Static plugin.
 * Computes an absolute path on the host system relative to the CWD.
 */
export const uploadConfig = {
  root: join(process.cwd(), uploadEnv.UPLOAD_DIR),
  prefix: uploadEnv.UPLOAD_ROUTE,
};

export default uploadEnv;
