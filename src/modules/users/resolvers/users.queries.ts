import { builder } from '@/core/lib/pothos-builder';
import { prisma } from '@/database/prisma.service';
import '../entities/user.entity';
import { userEntity } from '../entities/user.entity';
import { getUserWhereUniqueInput } from '../inputs';

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
    resolve: (query, root, args) => {
      const { where } = args;
      // Note: keep console logs out of production code; use a structured
      // logger if runtime diagnostics are required in production.
      return prisma.userModel.findFirst({
        ...query,
        where,
      });
    },
  }),
}));
