import { prisma } from '@/database/prisma.service';
import { builder } from '@/schema/builder';
import '../entities/user.entity';
import { CreateUserInput, UserUpdateInput, UserWhereInput } from '../inputs';

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: 'User',
    args: {
      data: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      const { data } = args;
      return await prisma.user.create({
        ...query,
        data: {
          ...data,
        },
      });
    },
  }),
  updateUser: t.prismaField({
    type: 'User',
    args: {
      where: t.arg({ type: UserWhereInput, required: true }),
      data: t.arg({ type: UserUpdateInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      const { data, where } = args;
      return await prisma.user.update({
        ...query,
        where: { ...where },
        data: { ...data },
      });
    },
  }),
}));
