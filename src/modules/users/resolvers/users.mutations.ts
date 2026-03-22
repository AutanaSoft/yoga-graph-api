import { prisma } from '@/database/prisma.service';
import { Prisma } from '@/database/prisma/generated/client';
import { builder } from '@/core/lib/pothos-builder';
import '../entities/user.entity';
import { CreateUserInput, UserUpdateInput, UserWhereUniqueInput } from '../inputs';

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: 'UserModel',
    args: {
      data: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      const { data } = args;
      return await prisma.userModel.create({
        ...query,
        data: {
          ...data,
        },
      });
    },
  }),
  updateUser: t.prismaField({
    type: 'UserModel',
    args: {
      where: t.arg({ type: UserWhereUniqueInput, required: true }),
      data: t.arg({ type: UserUpdateInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      const { data, where } = args;
      return await prisma.userModel.update({
        ...query,
        where: { ...where } as Prisma.UserModelWhereUniqueInput,
        data: { ...data },
      });
    },
  }),
}));
