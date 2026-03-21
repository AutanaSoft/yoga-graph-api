import { z } from 'zod';

/**
 * Zod schema for the User Profile entity.
 * Represents the complete structure of a user profile in the system.
 */
export const UserProfileSchema = z.object({
  id: z.uuid('Invalid user ID'),
  firstName: z.string('First name must be a string'),
  lastName: z.string('Last name must be a string'),
  phone: z.string('Phone number must be a string'),
  country: z.string('Country must be a string'),
  createdAt: z.iso.datetime('Creation date must be a valid datetime'),
  updatedAt: z.iso.datetime('Update date must be a valid datetime'),
});

/**
 * Type definition for UserProfile, inferred from UserProfileSchema.
 */
export type UserProfileType = z.infer<typeof UserProfileSchema>;

/**
 * Zod schema for creating a new User Profile.
 * Omits auto-generated fields like id, createdAt, and updatedAt,
 * and adds specific validation constraints for input data.
 */
export const CreateUserProfileSchema = UserProfileSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  firstName: z
    .string('First name must be a string')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string('Last name must be a string')
    .max(50, 'Last name must be less than 50 characters'),
  phone: z
    .string('Phone number must be a string')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[0-9+\s()-]+$/, 'Phone number contains invalid characters'),
  country: z.string('Country must be a string').max(50, 'Country must be less than 50 characters'),
});

/**
 * Type definition for creating a new User Profile, inferred from CreateUserProfileSchema.
 */
export type CreateUserProfileType = z.infer<typeof CreateUserProfileSchema>;

/**
 * Zod schema for updating an existing User Profile.
 * Makes all fields from CreateUserProfileSchema optional.
 */
export const UpdateUserProfileSchema = CreateUserProfileSchema.partial();

/**
 * Type definition for updating a User Profile, inferred from UpdateUserProfileSchema.
 */
export type UpdateUserProfileType = z.infer<typeof UpdateUserProfileSchema>;
