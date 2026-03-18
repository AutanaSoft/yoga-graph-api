import { z } from 'zod';
import { builder } from '@/schema/builder';

export const UpdateUserSchema = z.object({
  id: z.string().uuid('ID inválido'),
  userName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;

export const UpdateUserInput = builder
  .inputType('UpdateUserInput', {
    fields: (t) => ({
      id: t.string({ required: true }),
      userName: t.string({ required: false }),
    }),
  })
  .validate(UpdateUserSchema);
