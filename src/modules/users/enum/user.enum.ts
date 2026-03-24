import { builder } from '@/core/lib';
import { UserStatus } from '@/database/prisma/generated/client';

/**
 * GraphQL enum exposing Prisma's `UserStatus` values.
 *
 * This maps the generated Prisma `UserStatus` enum into the Pothos
 * schema so it can be used in GraphQL types and inputs (for example
 * filtering or user creation/update operations).
 *
 * Keep this in sync with the Prisma schema: if the enum values change
 * regenerate the Prisma client and ensure the GraphQL schema is updated.
 */
export const UserStatusEnum = builder.enumType(UserStatus, {
  name: 'UserStatus',
});
