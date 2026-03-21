import { builder, UserStatusEnum } from '@/schema/builder';
import { CreateUserSchema, UpdateUserSchema } from '../schemas';

export const CreateUserInput = builder
  .inputType('CreateUserInput', {
    fields: (t) => ({
      roles: t.stringList({ required: false }),
      email: t.string({ required: true }),
      userName: t.string({ required: true }),
      password: t.string({ required: true }),
    }),
  })
  .validate(CreateUserSchema);

// Note: define reusable Prisma filters/where helpers here when needed.

export const UpdateUserDataInput = builder.inputType('UpdateUserDataInput', {
  fields: (t) => ({
    status: t.field({ type: UserStatusEnum, required: false }),
    roles: t.stringList({ required: false }),
    email: t.string({ required: false }),
    userName: t.string({ required: false }),
  }),
});

export const UpdateUserInput = builder
  .inputType('UpdateUserInput', {
    fields: (t) => ({
      id: t.string({ required: true }),
      data: t.field({ type: UpdateUserDataInput, required: true }),
    }),
  })
  .validate(UpdateUserSchema);
