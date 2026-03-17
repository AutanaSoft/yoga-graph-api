import { createSchema } from 'graphql-yoga';

// Importación de Mapeo de Sub-Schemas (Se agregarán acá a futuro los modulos)
import { systemResolvers } from '../modules/system/system.resolver.js';
import { systemTypeDefs } from '../modules/system/system.schema.js';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      _empty: String
      systemStatus: String!
    }
    type Mutation {
      _empty: String
    }
    type Subscription {
      _empty: String
    }
    
    ${systemTypeDefs}
  `,
  resolvers: {
    Query: {
      ...systemResolvers.Query,
      systemStatus: () => 'System OK',
    },
    Mutation: {},
    Subscription: {},
  },
});
