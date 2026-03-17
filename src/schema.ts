import { createSchema } from 'graphql-yoga';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from '@/modules/user/user.schema';
import { userResolvers } from '@/modules/user/user.resolvers';
import { systemTypeDefs } from '@/modules/system/system.schema';
import { systemResolvers } from '@/modules/system/system.resolvers';
import { healthTypeDefs } from '@/modules/health/health.schema';
import { healthResolvers } from '@/modules/health/health.resolvers';

const typeDefs = mergeTypeDefs([userTypeDefs, systemTypeDefs, healthTypeDefs]);
const resolvers = mergeResolvers([userResolvers, systemResolvers, healthResolvers]);

export const schema = createSchema({
  typeDefs,
  resolvers,
});
