import { builder } from '@/core/platform/graphql';
import { UserRoleEnum, UserStatusEnum } from '../enum';

/**
 * GraphQL object type for `User` backed by the Prisma `UserModel`.
 *
 * Exposes a selection of user fields to the GraphQL schema. Keep the
 * exposed fields minimal and add computed fields here if you need to
 * transform or combine database values for API consumers.
 *
 * Notes:
 * - Use `expose` helpers for direct mapping of Prisma model fields.
 * - Use custom `resolve` functions when the GraphQL type differs from
 *   the Prisma property shape (see `status` field below).
 */
export const userEntity = builder.prismaObject('UserModel', {
  name: 'User',
  fields: (t) => ({
    // Public unique identifier
    id: t.exposeID('id'),

    // Status mapped through the UserStatusEnum GraphQL enum. The
    // resolver returns the raw Prisma value which the enum will map.
    status: t.field({
      type: UserStatusEnum,
      resolve: (user) => user.status,
    }),

    // Roles stored as an enum array in the DB
    roles: t.field({
      type: [UserRoleEnum],
      resolve: (user) => user.roles,
    }),

    // Contact / identification fields
    email: t.exposeString('email'),
    userName: t.exposeString('userName'),

    // Timestamps
    verifiedAt: t.expose('verifiedAt', { type: 'DateTime', nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
