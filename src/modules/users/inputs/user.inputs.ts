import { builder } from '@/core/lib/pothos-builder';
import { emailFilterSchema, stringFilterSchema, uuidFilterSchema } from '@/core/schemas';
import { UserStatus } from '@/database/prisma/generated/browser';
import z from 'zod';

export const UserStatusEnum = builder.enumType(UserStatus, {
  name: 'UserStatus',
});

const uuidFilterInput = builder.inputType('UuidFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
  }),
});

const emailFilterInput = builder.inputType('EmailFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
    contains: t.string({ required: false }),
    startsWith: t.string({ required: false }),
    endsWith: t.string({ required: false }),
  }),
});

const stringFilterInput = builder.inputType('StringFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
    contains: t.string({ required: false }),
    startsWith: t.string({ required: false }),
    endsWith: t.string({ required: false }),
  }),
});

export const getUserWhereInputSchema = z.object({
  id: uuidFilterSchema.optional(),
  email: emailFilterSchema.optional(),
  userName: stringFilterSchema.optional(),
});

export const getUserWhereInput = builder
  .inputType('GetUserWhereInput', {
    fields: (t) => ({
      id: t.field({ type: uuidFilterInput, required: false }),
      email: t.field({ type: emailFilterInput, required: false }),
      userName: t.field({ type: stringFilterInput, required: false }),
    }),
  })
  .validate(getUserWhereInputSchema);
