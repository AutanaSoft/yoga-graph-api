import { PrismaPg } from '@prisma/adapter-pg';
import appConfig from '../config/app.config';
import prismaConfig from '../config/prisma.config';
import { PrismaClient } from './prisma/generated/client';

const connectionString = prismaConfig.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    adapter,
    log: appConfig.APP_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (appConfig.APP_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}
