import { builder, UuidFilterInput } from '@/core/lib/pothos-builder';
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
  .prismaWhereUnique('ProfileModel', {
    fields: () => ({
      id: 'String',
      userId: 'String',
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
  .prismaUpdate('ProfileModel', {
    name: 'UserProfileUpdateInput',
    fields: () => ({
      firstName: 'String',
      lastName: 'String',
      phone: 'String',
      country: 'String',
    }),
  })
  .validate(UpdateUserProfileSchema);

export const UserProfileWhereInput = builder.prismaWhere('ProfileModel', {
  fields: {
    id: UuidFilterInput,
    userId: UuidFilterInput,
  },
});
