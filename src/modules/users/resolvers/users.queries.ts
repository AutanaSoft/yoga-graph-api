import { builder } from '@/core/lib/pothos-builder';
import { prisma } from '@/database/prisma.service';
import { Prisma } from '@/database/prisma/generated/client';
import '../entities/user.entity';
import { UserWhereInput } from '../inputs';

builder.queryFields((t) => ({
  getUser: t.prismaField({
    type: 'UserModel',
    nullable: true,
    args: { where: t.arg({ type: UserWhereInput, required: true }) },
    resolve: (query, _parent, args) => {
      // GraphQL input types are validated at the boundary and then mapped to
      // Prisma where types for strict database query typing.
      console.log('Received where args for getUsers:', query);
      return prisma.userModel.findFirst({
        ...query,
        where: args.where as Prisma.UserModelWhereInput,
      });
    },
  }),
  getUsers: t.prismaField({
    type: ['UserModel'],
    args: { where: t.arg({ type: UserWhereInput, required: true }) },
    resolve: (query, _parent, args) => {
      // Same mapping strategy as above for consistency and clearer intent.
      return prisma.userModel.findMany({
        ...query,
        where: args.where as Prisma.UserModelWhereInput,
      });
    },
  }),
}));
