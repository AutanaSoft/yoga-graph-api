import { z } from 'zod';
import {
  createOrderBySchema,
  dateTimeFilterSchema,
  paginationSchema,
  stringFilterSchema,
  uuidFilterSchema,
} from '@/core/shared';
import { userRolesEnumSchema, userStatusSchema } from './user-db.schemas';

export const userWhereUniqueInputSchema = z
  .object({
    id: z
      .uuid('Invalid user ID')
      .transform((value) => value?.trim())
      .optional(),
    email: z
      .email('Invalid email format')
      .transform((value) => value?.trim().toLowerCase())
      .optional(),
    userName: z
      .string('Username must be a string')
      .transform((value) => value?.trim())
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

export const userStringFilterSchema = stringFilterSchema;

export const userUuidFilterSchema = uuidFilterSchema;

export const userDateTimeFilterSchema = dateTimeFilterSchema;

export const userStatusFilterSchema = z.object({
  equals: userStatusSchema.optional(),
  in: z.array(userStatusSchema).optional(),
  notIn: z.array(userStatusSchema).optional(),
});

export const userRolesListFilterSchema = z.object({
  has: userRolesEnumSchema.optional(),
  hasEvery: z.array(userRolesEnumSchema).optional(),
  hasSome: z.array(userRolesEnumSchema).optional(),
  isEmpty: z.boolean().optional(),
});

export const userWhereInputSchema = z.object({
  id: userUuidFilterSchema.optional(),
  email: userStringFilterSchema.optional(),
  userName: userStringFilterSchema.optional(),
  status: userStatusFilterSchema.optional(),
  roles: userRolesListFilterSchema.optional(),
  verifiedAt: userDateTimeFilterSchema.optional(),
  createdAt: userDateTimeFilterSchema.optional(),
  updatedAt: userDateTimeFilterSchema.optional(),
});

export const userOrderByInputSchema = createOrderBySchema([
  'id',
  'email',
  'userName',
  'status',
  'verifiedAt',
  'createdAt',
  'updatedAt',
]);

export const userPaginationInputSchema = paginationSchema.partial();

export type UserWhereUniqueInputType = z.infer<typeof userWhereUniqueInputSchema>;
export type UserWhereInputType = z.infer<typeof userWhereInputSchema>;
export type UserOrderByInputType = z.infer<typeof userOrderByInputSchema>;
export type UserPaginationInputType = z.infer<typeof userPaginationInputSchema>;
