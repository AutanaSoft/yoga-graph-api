import { builder } from '@/schema/builder';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  status: z.enum(['REGISTERED', 'ACTIVE', 'FROZEN', 'DELETED']).optional(),
  email: z.email('Formato de correo inválido'),
  userName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(20, 'El nombre debe tener menos de 20 caracteres'),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;

export const CreateUserInput = builder
  .inputType('CreateUserInput', {
    fields: (t) => ({
      email: t.string({ required: true }),
      userName: t.string({ required: false }),
    }),
  })
  .validate(CreateUserSchema);
