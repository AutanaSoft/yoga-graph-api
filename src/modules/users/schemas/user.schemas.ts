import { z } from 'zod';

/**
 * Zod enumeration for user lifecycle states.
 * - REGISTERED: Initial state after sign-up.
 * - ACTIVE: Account verified and active.
 * - FROZEN: Temporarily suspended.
 * - DELETED: Account logically removed.
 */
export const UserStatusEnum = z.enum(['REGISTERED', 'ACTIVE', 'FROZEN', 'DELETED'], {
  error: () => ({ message: 'Invalid user status' }),
});

/**
 * Type definition for user status, inferred from UserStatusEnum.
 */
export type UserStatusType = z.infer<typeof UserStatusEnum>;

/**
 * Zod enumeration for user authorization roles.
 * Defines the access levels within the application.
 */
export const UserRolesEnum = z.enum(['USER', 'ADMIN'], {
  error: () => ({ message: 'Invalid user role' }),
});

/**
 * Type definition for user roles, inferred from UserRolesEnum.
 */
export type UserRolesType = z.infer<typeof UserRolesEnum>;

/**
 * Zod schema for the User entity.
 * Models the complete structure of a user as persisted in the database.
 */
export const UserEntitySchema = z.object({
  id: z.uuid('Invalid user ID'),
  status: UserStatusEnum,
  roles: z.array(UserRolesEnum).default(['USER']),
  email: z.email('Invalid email format'),
  userName: z.string('Username must be a string'),
  password: z.string('Password must be a string'),
  verifiedAt: z.iso.datetime('Verification date must be a valid datetime').nullable(),
  createdAt: z.iso.datetime('Creation date must be a valid datetime'),
  updatedAt: z.iso.datetime('Update date must be a valid datetime'),
});

/**
 * Type definition for a User entity, inferred from UserEntitySchema.
 */
export type UserEntityType = z.infer<typeof UserEntitySchema>;

/**
 * Zod schema for creating a new User account.
 * Omits auto-generated or system-managed fields and includes specific validation
 * for username and password complexity.
 */
export const CreateUserSchema = UserEntitySchema.omit({
  id: true,
  status: true,
  verifiedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.email('Invalid email format').max(100, 'Email must be less than 100 characters'),
  userName: z
    .string('Username must be a string')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[A-Za-z0-9._-]+$/, 'Username may only contain alphanumeric characters and .-_'),
  password: z
    .string('Password must be a string')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be at most 16 characters')
    .regex(/^[A-Za-z0-9!@#$*._-]+$/, 'Password contains invalid characters')
    .refine((val) => /[0-9]/.test(val), { message: 'Password must contain at least one number' })
    .refine((val) => /[!@#$*._-]/.test(val), {
      message: 'Password must contain at least one special character',
    }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;

/**
 * Zod schema for updating an existing User account.
 * Makes fields optional and allows updating the user status.
 */
export const UpdateUserSchema = z.object({
  id: z.uuid('Invalid user ID'),
  data: CreateUserSchema.partial()
    .omit({
      password: true, // Password updates should be handled separately with proper validation
    })
    .extend({
      status: UserStatusEnum.optional(),
    }),
});

/**
 * Type definition for updating a User, inferred from UpdateUserSchema.
 */
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
