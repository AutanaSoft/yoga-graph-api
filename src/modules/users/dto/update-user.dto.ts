import { z } from 'zod';

export const UpdateUserSchema = z.object({
  id: z.string().uuid('ID inválido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
