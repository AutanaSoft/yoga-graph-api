import type { User, UserProfile } from '@/database/prisma/generated/client';
import { builder, UserStatusEnum } from '@/schema/builder';
import { UserProfileEntity } from './user-profile.entity';

export type UserWithProfile = User & { profile?: UserProfile | null };

export const UserWithProfileEntity = builder.objectType(
  builder.objectRef<UserWithProfile>('UserWithProfile'),
  {
    fields: (t) => ({
      id: t.exposeID('id'),
      status: t.field({
        type: UserStatusEnum,
        resolve: (user) => user.status,
      }),
      roles: t.expose('roles', { type: ['String'] }),
      email: t.exposeString('email'),
      userName: t.exposeString('userName', { nullable: true }),
      verifiedAt: t.expose('verifiedAt', { type: 'DateTime', nullable: true }),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      profile: t.field({
        type: UserProfileEntity,
        nullable: true,
        resolve: (user) => user.profile || null,
      }),
    }),
  },
);
