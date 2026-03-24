import { z } from 'zod';

export const UserStatusEnum = z.enum(
  ['REGISTERED', 'ACTIVE', 'FROZEN', 'DELETED'],
  'Invalid user status',
);

export type UserStatusType = z.infer<typeof UserStatusEnum>;

export const UserRolesEnumSchema = z.enum(['USER', 'ADMIN'], 'Invalid user role');

export type UserRolesType = z.infer<typeof UserRolesEnumSchema>;

export const UserEntitySchema = z.object({
  id: z.uuid('Invalid user ID'),
  status: UserStatusEnum,
  roles: z.array(UserRolesEnumSchema).default(['USER']),
  email: z.email('Invalid email format'),
  userName: z.string('Username must be a string'),
  password: z.string('Password must be a string'),
  verifiedAt: z.iso.datetime('Verification date must be a valid datetime').nullable(),
  createdAt: z.iso.datetime('Creation date must be a valid datetime'),
  updatedAt: z.iso.datetime('Update date must be a valid datetime'),
});

export type UserEntityType = z.infer<typeof UserEntitySchema>;

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

export const UpdateUserSchema = CreateUserSchema.partial()
  .omit({
    password: true,
  })
  .extend({
    status: UserStatusEnum.optional(),
  });

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;

/**
 * UserWhereUniqueInputSchema
 *
 * Validates input used to find a single user by a unique identifier.
 * - Accepts `id`, `email`, or `userName` (each is optional individually).
 * - Applies lightweight transformations: trims strings and lowercases email.
 * - Enforces that exactly one of `id`, `email`, or `userName` is provided.
 */
export const UserWhereUniqueInputSchema = z
  .object({
    id: z
      .uuid('Invalid user ID')
      .transform((val) => val?.trim())
      .optional(),
    email: z
      .email('Invalid email format')
      .transform((val) => val?.trim().toLowerCase())
      .optional(),
    userName: z
      .string('Username must be a string')
      .transform((val) => val?.trim())
      .optional(),
  })
  .refine(
    (args) => {
      const providedCount = [args.id, args.email, args.userName].filter(Boolean).length;
      return providedCount === 1;
    },
    {
      message: 'You must provide exactly one of: id, email, or userName',
    },
  );

export type UserWhereUniqueInputType = z.infer<typeof UserWhereUniqueInputSchema>;

export const UserWhereInputSchema = z.object({
  id: z.union([z.uuid(), z.object({ equals: z.uuid() })]).optional(),
  email: z.email('Invalid email format').optional(),
  userName: z.string('Username must be a string').optional(),
  status: UserStatusEnum.optional(),
  roles: z.array(UserRolesEnumSchema).optional(),
  verifiedAt: z.iso.datetime('Verification date must be a valid datetime').nullable().optional(),
  createdAt: z.iso.datetime('Creation date must be a valid datetime').optional(),
});

export type UserWhereInputType = z.infer<typeof UserWhereInputSchema>;
