import type { Prisma } from '@/database/prisma/generated/client';

type UserWhereInputArgs = {
  id?: Prisma.StringFilter;
  email?: Prisma.StringFilter;
  userName?: Prisma.StringFilter;
  status?: Prisma.EnumUserStatusFilter;
  rolesHas?: string;
  verifiedAt?: Prisma.DateTimeNullableFilter;
  createdAt?: Prisma.DateTimeFilter;
  updatedAt?: Prisma.DateTimeFilter;
};

export const mapUserWhereInput = (
  where?: UserWhereInputArgs | null,
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
