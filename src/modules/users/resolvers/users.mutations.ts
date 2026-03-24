import { builder } from '@/core/platform/graphql';
import type { Prisma } from '@/database/prisma/generated/client';
import { userEntity } from '../entities/user.entity';
import {
  createUserDataInput,
  getUserWhereUniqueInput,
  getUsersWhereInput,
  updateUserDataInput,
} from '../inputs';
import { mapUserWhereInput } from '../mappers';
import { usersService } from '../services';

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: userEntity,
    args: {
      data: t.arg({ type: createUserDataInput, required: true }),
    },
    resolve: (query, _root, args) =>
      usersService.createUser({
        ...query,
        data: args.data,
      }),
  }),

  updateUser: t.prismaField({
    type: userEntity,
    args: {
      where: t.arg({ type: getUserWhereUniqueInput, required: true }),
      data: t.arg({ type: updateUserDataInput, required: true }),
    },
    resolve: (query, _root, args) =>
      usersService.updateUser({
        ...query,
        where: args.where as Prisma.UserModelWhereUniqueInput,
        data: args.data,
      }),
  }),

  updateUsers: t.field({
    type: 'Int',
    args: {
      where: t.arg({ type: getUsersWhereInput, required: true }),
      data: t.arg({ type: updateUserDataInput, required: true }),
    },
    resolve: async (_root, args) => {
      const result = await usersService.updateUsers({
        where: mapUserWhereInput(args.where),
        data: args.data,
      });

      return result.count;
    },
  }),

  deleteUser: t.prismaField({
    type: userEntity,
    args: {
      where: t.arg({ type: getUserWhereUniqueInput, required: true }),
    },
    resolve: (query, _root, args) =>
      usersService.deleteUser({
        ...query,
        where: args.where as Prisma.UserModelWhereUniqueInput,
      }),
  }),

  deleteUsers: t.field({
    type: 'Int',
    args: {
      where: t.arg({ type: getUsersWhereInput, required: true }),
    },
    resolve: async (_root, args) => {
      const result = await usersService.deleteUsers({
        where: mapUserWhereInput(args.where),
      });

      return result.count;
    },
  }),
}));
