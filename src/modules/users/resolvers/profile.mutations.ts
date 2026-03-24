import type { Prisma } from '@/database/prisma/generated/client';
import { builder } from '@/core/platform/graphql';
import { userProfileEntity } from '../entities';
import {
  createUserProfileDataInput,
  updateUserProfileDataInput,
  userProfileWhereByUserIdInput,
} from '../inputs/profile.inputs';
import { usersService } from '../services';

builder.mutationFields((t) => ({
  createUserProfile: t.prismaField({
    type: userProfileEntity,
    args: {
      where: t.arg({ type: userProfileWhereByUserIdInput, required: true }),
      data: t.arg({ type: createUserProfileDataInput, required: true }),
    },
    resolve: (query, _root, args) =>
      usersService.createUserProfile({
        ...query,
        data: {
          ...args.data,
          userId: args.where.userId,
        },
      }),
  }),

  updateUserProfile: t.prismaField({
    type: userProfileEntity,
    args: {
      where: t.arg({ type: userProfileWhereByUserIdInput, required: true }),
      data: t.arg({ type: updateUserProfileDataInput, required: true }),
    },
    resolve: (query, _root, args) =>
      usersService.updateUserProfile({
        ...query,
        where: args.where as Prisma.ProfileModelWhereUniqueInput,
        data: args.data,
      }),
  }),
}));
