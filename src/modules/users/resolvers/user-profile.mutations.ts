import { prisma } from '@/database/prisma.service';
import { Prisma } from '@/database/prisma/generated/client';
import { builder } from '@/schema/builder';
import '../entities/user-profile.entity';
import {
  CreateUserProfileInput,
  UserProfileUpdateInput,
  UserProfileWhereUniqueInput,
} from '../inputs';

builder.mutationFields((t) => ({
  createUserProfile: t.prismaField({
    type: 'UserProfile',
    args: {
      data: t.arg({ type: CreateUserProfileInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      const { data } = args;
      return await prisma.userProfile.create({
        ...query,
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          country: data.country,
          user: { connect: { id: data.userId } },
        },
      });
    },
  }),
  updateUserProfile: t.prismaField({
    type: 'UserProfile',
    args: {
      where: t.arg({ type: UserProfileWhereUniqueInput, required: true }),
      data: t.arg({ type: UserProfileUpdateInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      const { data, where } = args;
      return await prisma.userProfile.update({
        ...query,
        where: { ...where } as Prisma.UserProfileWhereUniqueInput,
        data: { ...data },
      });
    },
  }),
  deleteUserProfile: t.prismaField({
    type: 'UserProfile',
    args: {
      where: t.arg({ type: UserProfileWhereUniqueInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      const { where } = args;
      return await prisma.userProfile.delete({
        ...query,
        where: { ...where } as Prisma.UserProfileWhereUniqueInput,
      });
    },
  }),
}));
