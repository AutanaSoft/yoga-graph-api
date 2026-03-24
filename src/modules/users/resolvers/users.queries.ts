import { builder } from '@/core/platform/graphql';
import { toPrismaPagination } from '@/core/shared';
import { userEntity } from '../entities/user.entity';
import {
  getUserWhereUniqueInput,
  getUsersWhereInput,
  userOrderByInput,
  userPaginationInput,
} from '../inputs';
import { usersService } from '../services';

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
        ...args,
      }),
  }),

  getUsers: t.prismaField({
    type: [userEntity],
    args: {
      where: t.arg({ type: getUsersWhereInput, required: false }),
      orderBy: t.arg({ type: [userOrderByInput], required: false }),
      pagination: t.arg({ type: userPaginationInput, required: false }),
    },
    resolve: (query, _root, args) => {
      const { skip, take } = toPrismaPagination(args.pagination);

      return usersService.getUsers({
        ...query,
        where: args.where ?? undefined,
        orderBy: args.orderBy ?? undefined,
        skip,
        take,
      });
    },
  }),
}));
