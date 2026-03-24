import { z } from 'zod';

export const createUserProfileDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  country: z.string().optional(),
});

export const updateUserProfileDataSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().min(1, 'Last name is required').optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
  })
  .refine((value) => Object.values(value).some((field) => field !== undefined), {
    message: 'At least one profile field is required',
  });

export const userProfileWhereByUserIdSchema = z.object({
  userId: z.uuid('User ID must be a valid UUID'),
});
