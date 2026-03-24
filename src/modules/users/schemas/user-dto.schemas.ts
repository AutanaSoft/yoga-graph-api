import { z } from 'zod';
import { userEntitySchema, userRolesEnumSchema, userStatusSchema } from './user-db.schemas';

export const createUserSchema = userEntitySchema
  .omit({
    id: true,
    status: true,
    verifiedAt: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    email: z
      .email('Invalid email format')
      .max(100, 'Email must be less than 100 characters')
      .transform((value) => value.trim().toLowerCase()),
    userName: z
      .string('Username must be a string')
      .min(4, 'Username must be at least 4 characters')
      .max(20, 'Username must be at most 20 characters')
      .regex(/^[A-Za-z0-9._-]+$/, 'Username may only contain alphanumeric characters and .-_')
      .transform((value) => value.trim()),
    password: z
      .string('Password must be a string')
      .min(6, 'Password must be at least 6 characters')
      .max(16, 'Password must be at most 16 characters')
      .regex(/^[A-Za-z0-9!@#$*._-]+$/, 'Password contains invalid characters')
      .refine((value) => /[0-9]/.test(value), {
        message: 'Password must contain at least one number',
      })
      .refine((value) => /[!@#$*._-]/.test(value), {
        message: 'Password must contain at least one special character',
      }),
  });

export const updateUserSchema = createUserSchema
  .partial()
  .extend({
    status: userStatusSchema.optional(),
    roles: z.array(userRolesEnumSchema).optional(),
    verifiedAt: z.iso.datetime('Verification date must be a valid datetime').nullable().optional(),
  })
  .omit({
    password: true,
  });

export const createUserDataInputSchema = createUserSchema;
export const updateUserDataInputSchema = updateUserSchema;

export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
