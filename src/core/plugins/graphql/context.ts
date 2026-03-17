import { PrismaClient } from '@/database/prisma/generated/client';
import { prisma } from '@/database/prisma.service';
import { YogaInitialContext } from 'graphql-yoga';

export interface GraphQLContext extends YogaInitialContext {
  prisma: PrismaClient;
}

export function createContext(initialContext: YogaInitialContext): GraphQLContext {
  return {
    ...initialContext,
    prisma,
  };
}
