import { prisma } from '@/database/prisma.service';
import { Prisma } from '@/database/prisma/generated/client';
import { builder } from '@/core/lib/pothos-builder';
import '../entities/user.entity';
import { UserWhereInput } from '../inputs';

builder.queryFields((t) => ({
  getUser: t.prismaField({
    type: 'User',
    nullable: true,
    args: { where: t.arg({ type: UserWhereInput, required: true }) },
    resolve: (query, _parent, args) => {
      // GraphQL input types are validated at the boundary and then mapped to
      // Prisma where types for strict database query typing.
      return prisma.user.findFirst({
        ...query,
        where: args.where as Prisma.UserWhereInput,
      });
    },
  }),
  getUsers: t.prismaField({
    type: ['User'],
    args: { where: t.arg({ type: UserWhereInput, required: true }) },
    resolve: (query, _parent, args) => {
      // Same mapping strategy as above for consistency and clearer intent.
      return prisma.user.findMany({
        ...query,
        where: args.where as Prisma.UserWhereInput,
      });
    },
  }),
}));
