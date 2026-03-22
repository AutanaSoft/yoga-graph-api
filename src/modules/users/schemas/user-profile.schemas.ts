import { z } from 'zod';

export const CreateUserProfileSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  phone: z.string().optional(),
  country: z.string().optional(),
  userId: z.uuid('Debe ser un UUID válido para el usuario'),
});

export const UpdateUserProfileSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio').optional(),
  lastName: z.string().min(1, 'El apellido es obligatorio').optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
});
