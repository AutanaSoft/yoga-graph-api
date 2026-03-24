import { z } from 'zod';

export const userStatusSchema = z.enum(
  ['REGISTERED', 'ACTIVE', 'FROZEN', 'DELETED'],
  'Invalid user status',
);

export const userRolesEnumSchema = z.enum(['USER', 'ADMIN'], 'Invalid user role');

export const userEntitySchema = z.object({
  id: z.uuid('Invalid user ID'),
  status: userStatusSchema,
  roles: z.array(userRolesEnumSchema).default(['USER']),
  email: z.email('Invalid email format'),
  userName: z.string('Username must be a string'),
  password: z.string('Password must be a string'),
  verifiedAt: z.iso.datetime('Verification date must be a valid datetime').nullable(),
  createdAt: z.iso.datetime('Creation date must be a valid datetime'),
  updatedAt: z.iso.datetime('Update date must be a valid datetime'),
});

export type UserEntityType = z.infer<typeof userEntitySchema>;
export type UserStatusType = z.infer<typeof userStatusSchema>;
export type UserRolesType = z.infer<typeof userRolesEnumSchema>;
