import { createSchema } from 'graphql-yoga';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from './modules/user/user.schema';
import { userResolvers } from './modules/user/user.resolvers';
import { systemTypeDefs } from './modules/system/system.schema';
import { systemResolvers } from './modules/system/system.resolvers';

const typeDefs = mergeTypeDefs([userTypeDefs, systemTypeDefs]);
const resolvers = mergeResolvers([userResolvers, systemResolvers]);

export const schema = createSchema({
  typeDefs,
  resolvers,
});
