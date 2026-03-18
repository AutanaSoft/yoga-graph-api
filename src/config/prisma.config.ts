/**
 * Database Configuration Module for Prisma ORM.
 * Responsible for defining and checking all environment prerequisites related to Data Access.
 * @module config/prisma.config
 */
import { z } from 'zod';
import { validateEnv } from './env-validator';

/**
 * Zod schema expressing the required constraints for the Database configuration.
 */
const envSchema = z.object({
  DATABASE_URL: z.url(),
});

/**
 * Inferred TypeScript type derived from the database environment schema.
 */
export type PrismaConfigType = z.infer<typeof envSchema>;

/**
 * Validated and securely typed instance of the Prisma configuration.
 * Commonly used whenever raw configuration like the database URL is required manually.
 */
export default validateEnv<PrismaConfigType>(envSchema);
