import { builder } from '@/core/lib/pothos-builder';
import { UserStatus } from '@/database/prisma/generated/browser';
import { UserWhereUniqueInputSchema } from '../schemas';

export const UserStatusEnum = builder.enumType(UserStatus, {
  name: 'UserStatus',
});

export const getUserWhereInput = builder
  .inputType('GetUserWhereInput', {
    fields: (t) => ({
      id: t.string({ required: false }),
      email: t.string({ required: false }),
      userName: t.string({ required: false }),
    }),
  })
  .validate(UserWhereUniqueInputSchema);
