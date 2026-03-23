import { UserModel } from '@/database/prisma/generated/client';
import { YogaInitialContext } from 'graphql-yoga';

/**
 * Represents the custom GraphQL context shared across all resolvers.
 * Extends Yoga's default context to globally inject dependent services.
 */
export interface GraphQLContext extends YogaInitialContext {
  /** The initialized Prisma Database Client */
  // prisma: PrismaClient;
  user: UserModel | null;
}

/**
 * Factory function to build the GraphQL context per-request.
 *
 * @param {YogaInitialContext} initialContext - The incoming request/response context provided by Yoga.
 * @returns {GraphQLContext} The augmented context including global dependencies like Prisma.
 */
export function createContext(initialContext: YogaInitialContext): GraphQLContext {
  return {
    ...initialContext,
    user: null, // Placeholder for authenticated user data, to be populated by auth middleware in the future
  };
}
