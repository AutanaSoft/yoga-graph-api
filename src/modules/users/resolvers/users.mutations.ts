import { builder } from '@/core/lib/pothos-builder';
import type { Prisma } from '@/database/prisma/generated/client';
import { userEntity } from '../entities/user.entity';
import {
  createUserDataInput,
  getUserWhereUniqueInput,
  getUsersWhereInput,
  updateUserDataInput,
} from '../inputs';
import { usersService } from '../services';

const mapWhereInput = (
  where?: {
    id?: Prisma.StringFilter;
    email?: Prisma.StringFilter;
    userName?: Prisma.StringFilter;
    status?: Prisma.EnumUserStatusFilter;
    rolesHas?: string;
    verifiedAt?: Prisma.DateTimeNullableFilter;
    createdAt?: Prisma.DateTimeFilter;
    updatedAt?: Prisma.DateTimeFilter;
  } | null,
): Prisma.UserModelWhereInput | undefined => {
  if (!where) {
    return undefined;
  }

  const { rolesHas, ...restWhere } = where;

  return {
    ...restWhere,
    roles: rolesHas ? { has: rolesHas } : undefined,
  };
};

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
        where: mapWhereInput(args.where),
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
        where: mapWhereInput(args.where),
      });

      return result.count;
    },
  }),
}));
