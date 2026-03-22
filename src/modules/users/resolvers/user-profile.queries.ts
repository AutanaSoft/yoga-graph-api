import { builder } from '@/core/lib/pothos-builder';
import { prisma } from '@/database/prisma.service';
import { Prisma } from '@/database/prisma/generated/client';
import '../entities/user-profile.entity';
import { UserProfileWhereInput, UserProfileWhereUniqueInput } from '../inputs';

builder.queryFields((t) => ({
  getUserProfile: t.prismaField({
    type: 'ProfileModel',
    nullable: true,
    args: { where: t.arg({ type: UserProfileWhereUniqueInput, required: true }) },
    resolve: async (query, parent, args) => {
      // args.where comes from GraphQL input types and can be structurally
      // spread into the Prisma `where` object. Disable the eslint rule here
      // because the builder types are higher-level GraphQL types, not raw
      // Prisma types, and a direct cast would still be unsafe.

      return await prisma.profileModel.findUnique({
        ...query,
        where: args.where as Prisma.ProfileModelWhereUniqueInput,
      });
    },
  }),
  getUserProfiles: t.prismaField({
    type: ['ProfileModel'],
    args: { where: t.arg({ type: UserProfileWhereInput, required: false }) },
    resolve: async (query, parent, args) => {
      // See note above regarding typing between GraphQL inputs and Prisma
      // where objects.

      return await prisma.profileModel.findMany({
        ...query,
        where: { ...(args.where || {}) } as Prisma.ProfileModelWhereInput,
      });
    },
  }),
}));
