import { PrismaClient } from '@prisma/client';

export const userResolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: { prisma: PrismaClient }) => {
      return context.prisma.user.findMany();
    },
    user: async (_parent: unknown, { id }: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.user.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      { email, name }: { email: string; name?: string },
      context: { prisma: PrismaClient },
    ) => {
      return context.prisma.user.create({ data: { email, name } });
    },
    updateUser: async (
      _parent: unknown,
      { id, name }: { id: string; name: string },
      context: { prisma: PrismaClient },
    ) => {
      return context.prisma.user.update({ where: { id }, data: { name } });
    },
    deleteUser: async (
      _parent: unknown,
      { id }: { id: string },
      context: { prisma: PrismaClient },
    ) => {
      return context.prisma.user.delete({ where: { id } });
    },
  },
};
