import { builder } from '@/core/lib/pothos-builder';
import type { Prisma } from '@/database/prisma/generated/client';
import { userEntity } from '../entities/user.entity';
import { getUserWhereUniqueInput, getUsersWhereInput, userOrderByInput } from '../inputs';
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

/**
 * Query: getUser
 *
 * Fetch a single user by a unique identifier. The `where` argument is
 * validated using `UserWhereUniqueInputSchema` (via the GraphQL input
 * type) to ensure callers provide a valid unique lookup. The resolver
 * uses Prisma's `findFirst` with the passed `where` object — this keeps
 * the resolver simple while the validation ensures the lookup intent.
 *
 * Returns `null` when no matching user is found.
 */
builder.queryFields((t) => ({
  getUser: t.prismaField({
    type: userEntity,
    nullable: true,
    args: {
      where: t.arg({ type: getUserWhereUniqueInput, required: true }),
    },
    resolve: (query, _root, args) =>
      usersService.getUser({
        ...query,
        where: args.where,
      }),
  }),

  getUsers: t.prismaField({
    type: [userEntity],
    args: {
      where: t.arg({ type: getUsersWhereInput, required: false }),
      orderBy: t.arg({ type: [userOrderByInput], required: false }),
      skip: t.arg.int({ required: false }),
      take: t.arg.int({ required: false }),
    },
    resolve: (query, _root, args) =>
      usersService.getUsers({
        ...query,
        where: mapWhereInput(args.where ?? undefined),
        orderBy: args.orderBy ?? undefined,
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      }),
  }),
}));
