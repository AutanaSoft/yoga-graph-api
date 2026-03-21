import { prisma } from '@/database/prisma.service';
import { builder } from '@/schema/builder';
import '../entities/user.entity';
import { CreateUserInput } from '../inputs';

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      return await prisma.user.create({
        ...query,
        data: {
          email: args.input.email,
          userName: args.input.userName,
          password: args.input.password,
          roles: args.input.roles,
        },
      });
    },
  }),
}));
