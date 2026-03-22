import { prisma } from '@/database/prisma.service';
import { builder } from '@/schema/builder';
import '../entities/user-profile.entity';
import { UserProfileWhereInput, UserProfileWhereUniqueInput } from '../inputs';

builder.queryFields((t) => ({
  getUserProfile: t.prismaField({
    type: 'UserProfile',
    nullable: true,
    args: { where: t.arg({ type: UserProfileWhereUniqueInput, required: true }) },
    resolve: async (query, parent, args) => {
      // args.where comes from GraphQL input types and can be structurally
      // spread into the Prisma `where` object. Disable the eslint rule here
      // because the builder types are higher-level GraphQL types, not raw
      // Prisma types, and a direct cast would still be unsafe.

      return await prisma.userProfile.findUnique({
        ...query,
        where: { ...args.where },
      });
    },
  }),
  getUserProfiles: t.prismaField({
    type: ['UserProfile'],
    args: { where: t.arg({ type: UserProfileWhereInput, required: false }) },
    resolve: async (query, parent, args) => {
      // See note above regarding typing between GraphQL inputs and Prisma
      // where objects.

      return await prisma.userProfile.findMany({
        ...query,
        where: { ...(args.where || {}) },
      });
    },
  }),
}));
