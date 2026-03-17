import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('Formato de correo inválido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
