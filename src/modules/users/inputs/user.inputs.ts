import { builder, StringFilterInput, UuidFilterInput } from '@/core/lib/pothos-builder';
import { EmailFilterSchema, StringFilterSchema, UuidFilterSchema } from '@/core/schemas';
import z from 'zod';
import { CreateUserSchema, UpdateUserSchema } from '../schemas';

export const CreateUserInput = builder
  .prismaCreate('User', {
    name: 'CreateUserInput',
    fields: () => ({
      roles: 'String',
      email: 'String',
      userName: 'String',
      password: 'String',
    }),
  })
  .validate(CreateUserSchema);

export const UserUpdateInput = builder
  .prismaUpdate('User', {
    name: 'UserUpdateInput',
    fields: () => ({
      email: 'String',
      userName: 'String',
      password: 'String',
    }),
  })
  .validate(UpdateUserSchema);

export const UserWhereInput = builder
  .prismaWhere('User', {
    fields: {
      id: UuidFilterInput,
      email: StringFilterInput,
      userName: StringFilterInput,
    },
  })
  .validate(
    z
      .object({
        id: UuidFilterSchema.optional(),
        email: EmailFilterSchema.optional(),
        userName: StringFilterSchema.optional(),
      })
      .refine((args) => !!args.id || !!args.email || !!args.userName, {
        message: '',
      }),
  );

export const UserWhereUniqueInput = builder
  .prismaWhereUnique('User', {
    fields: () => ({
      id: 'String',
      email: 'String',
      userName: 'String',
    }),
  })
  .validate(
    z
      .object({
        id: z.uuid().optional(),
        email: z.email().optional(),
        userName: z.string().optional(),
      })
      .refine((args) => !!args.id || !!args.email || !!args.userName, {
        message: 'Debes buscar al usuario ya sea por ID o por Correo',
      }),
  );
