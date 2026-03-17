import { GraphQLContext } from '@/core/plugins/graphql/context';

export const userResolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: GraphQLContext) => {
      return context.prisma.user.findMany();
    },
    user: async (_parent: unknown, { id }: { id: string }, context: GraphQLContext) => {
      return context.prisma.user.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      { email, name }: { email: string; name?: string },
      context: GraphQLContext,
    ) => {
      return context.prisma.user.create({ data: { email, name } });
    },
    updateUser: async (
      _parent: unknown,
      { id, name }: { id: string; name: string },
      context: GraphQLContext,
    ) => {
      return context.prisma.user.update({ where: { id }, data: { name } });
    },
    deleteUser: async (_parent: unknown, { id }: { id: string }, context: GraphQLContext) => {
      return context.prisma.user.delete({ where: { id } });
    },
  },
};
