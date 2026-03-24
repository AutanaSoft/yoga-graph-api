import { builder } from '@/core/platform/graphql';
import {
  createUserProfileDataSchema,
  updateUserProfileDataSchema,
  userProfileWhereByUserIdSchema,
} from '../schemas';

export const userProfileWhereByUserIdInput = builder
  .inputType('UserProfileWhereByUserIdInput', {
    fields: (t) => ({
      userId: t.string({ required: true }),
    }),
  })
  .validate(userProfileWhereByUserIdSchema);

export const createUserProfileDataInput = builder
  .inputType('CreateUserProfileDataInput', {
    fields: (t) => ({
      firstName: t.string({ required: true }),
      lastName: t.string({ required: true }),
      phone: t.string({ required: false }),
      country: t.string({ required: false }),
    }),
  })
  .validate(createUserProfileDataSchema);

export const updateUserProfileDataInput = builder
  .inputType('UpdateUserProfileDataInput', {
    fields: (t) => ({
      firstName: t.string({ required: false }),
      lastName: t.string({ required: false }),
      phone: t.string({ required: false }),
      country: t.string({ required: false }),
    }),
  })
  .validate(updateUserProfileDataSchema);
