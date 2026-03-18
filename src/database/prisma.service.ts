import { PrismaPg } from '@prisma/adapter-pg';
import appConfig from '@/config/app.config';
import prismaConfig from '@/config/prisma.config';
import { PrismaClient } from './prisma/generated/client';

/**
 * Database connection string retrieved from environment variables.
 */
const connectionString = prismaConfig.DATABASE_URL;

/**
 * PostgreSQL adapter instance for Prisma.
 * This allows using the native `pg` driver for better performance.
 */
const adapter = new PrismaPg({ connectionString });

/**
 * Custom global object to store the PrismaClient instance
 * and prevent creating multiple database connections during hot-reloading (HMR).
 */
const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

/**
 * Singleton instance of the Prisma Client.
 * Reuses the global connection or generates a new one applying the adapter.
 * Configures exhaustive log levels if running in the development environment.
 */
export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    adapter,
    log: appConfig.APP_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// In non-production environments, we store the instance on the global scope
// to share the same database connection across code rebuilds.
if (appConfig.APP_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}
