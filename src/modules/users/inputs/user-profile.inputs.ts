import { builder, UuidFilterInput } from '@/schema/builder';
import { z } from 'zod';
import { CreateUserProfileSchema, UpdateUserProfileSchema } from '../schemas';

export const CreateUserProfileInput = builder
  .inputType('CreateUserProfileInput', {
    fields: (t) => ({
      firstName: t.string({ required: true }),
      lastName: t.string({ required: true }),
      phone: t.string({ required: false }),
      country: t.string({ required: false }),
      userId: t.string({ required: true }),
    }),
  })
  .validate(CreateUserProfileSchema);

export const UserProfileWhereUniqueInput = builder
  .prismaWhereUnique('UserProfile', {
    fields: (t) => ({
      id: t.string({ required: false }),
      userId: t.string({ required: false }),
    }),
  })
  .validate(
    z
      .object({
        id: z.string().uuid().optional(),
        userId: z.string().uuid().optional(),
      })
      .refine((args) => !!args.id || !!args.userId, {
        message: 'Debes buscar al perfil ya sea por ID o por UserId',
      }),
  );

export const UserProfileUpdateInput = builder
  .prismaUpdate('UserProfile', {
    name: 'UserProfileUpdateInput',
    fields: (t) => ({
      firstName: t.string({ required: false }),
      lastName: t.string({ required: false }),
      phone: t.string({ required: false }),
      country: t.string({ required: false }),
    }),
  })
  .validate(UpdateUserProfileSchema);

export const UserProfileWhereInput = builder.prismaWhere('UserProfile', {
  fields: {
    id: UuidFilterInput,
    userId: UuidFilterInput,
  },
});
