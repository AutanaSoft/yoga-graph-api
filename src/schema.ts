import { authResolvers } from '@modules/auth/auth.resolvers';
import { authTypeDefs } from '@modules/auth/auth.schema';
import { commonResolvers } from '@modules/common/common.resolvers';
import { commonTypeDefs } from '@modules/common/common.schema';
import { userResolvers } from '@modules/user/user.resolvers';
import { userTypeDefs } from '@modules/user/user.schema';
import { createSchema } from 'graphql-yoga';

const rootTypeDefs = /* GraphQL */ `
  type Query {
    _empty: String
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => 'Root Query placeholder',
  },
};

export const schema = createSchema({
  typeDefs: [rootTypeDefs, authTypeDefs, userTypeDefs, commonTypeDefs],
  resolvers: [rootResolvers, authResolvers, userResolvers, commonResolvers],
});
