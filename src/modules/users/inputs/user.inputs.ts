import { builder, StringFilterInput, UuidFilterInput } from '@/schema/builder';
import z from 'zod';
import { CreateUserSchema } from '../schemas';

export const CreateUserInput = builder
  .prismaCreate('User', {
    name: 'CreateUserInput',
    fields: (t) => ({
      roles: t.stringList({ required: false }),
      email: t.string({ required: true }),
      userName: t.string({ required: true }),
      password: t.string({ required: true }),
    }),
  })
  .validate(CreateUserSchema);

/*
 * Input `UserWhereInput` para filtrar usuarios en consultas. Este input se puede usar en resolvers para permitir búsquedas flexibles (ej. buscar usuarios por email que contenga cierta cadena o por ID específico). Personaliza los campos y operadores disponibles según las necesidades de tu aplicación.
 */
export const UserWhereInput = builder
  .prismaWhere('User', {
    fields: {
      id: UuidFilterInput,
      email: StringFilterInput,
    },
  })
  .validate(
    z
      .object({
        id: z.union([z.uuid(), z.object({ equals: z.uuid() })]).optional(),
        email: z
          .union([
            z.email('Debe ser un correo válido'),
            z.object({ equals: z.email('Debe ser un correo válido') }),
            z.object({ contains: z.string() }),
            z.object({ startsWith: z.string() }),
            z.object({ endsWith: z.string() }),
          ])
          .optional(),
      })
      .refine((args) => !!args.id || !!args.email, {
        message: 'Debes buscar al usuario ya sea por ID o por Correo',
      }),
  );
