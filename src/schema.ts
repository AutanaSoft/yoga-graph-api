import { createSchema } from 'graphql-yoga';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from '@/modules/user/user.schema';
import { userResolvers } from '@/modules/user/user.resolvers';
import { systemTypeDefs } from '@/modules/system/system.schema';
import { systemResolvers } from '@/modules/system/system.resolvers';
import { healthTypeDefs } from '@/modules/health/health.schema';
import { healthResolvers } from '@/modules/health/health.resolvers';

/**
 * Combines all individual module type definitions (schemas) into a single, unified GraphQL type definition array.
 * This array is merged using `@graphql-tools/merge`.
 */
const typeDefs = mergeTypeDefs([userTypeDefs, systemTypeDefs, healthTypeDefs]);

/**
 * Combines all individual module resolvers into a single, unified resolver map.
 * This map provides the concrete implementations for the queries and mutations defined in `typeDefs`.
 */
const resolvers = mergeResolvers([userResolvers, systemResolvers, healthResolvers]);

/**
 * The final, compiled executable GraphQL schema instance to be passed to the GraphQL Yoga execution engine.
 */
export const schema = createSchema({
  typeDefs,
  resolvers,
});
