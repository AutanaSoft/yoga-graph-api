import { z } from 'zod';
import { userStatusSchema } from './user-db.schemas';

export const userSortOrderSchema = z.enum(['asc', 'desc'], 'Sort order must be asc or desc');

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

export const userStringFilterSchema = z.object({
  equals: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  in: z.array(z.string()).optional(),
  notIn: z.array(z.string()).optional(),
});

export const userUuidFilterSchema = z.object({
  equals: z.uuid('Invalid user ID').optional(),
  in: z.array(z.uuid('Invalid user ID')).optional(),
  notIn: z.array(z.uuid('Invalid user ID')).optional(),
});

export const userDateTimeFilterSchema = z.object({
  equals: z.iso.datetime('Invalid datetime').optional(),
  lt: z.iso.datetime('Invalid datetime').optional(),
  lte: z.iso.datetime('Invalid datetime').optional(),
  gt: z.iso.datetime('Invalid datetime').optional(),
  gte: z.iso.datetime('Invalid datetime').optional(),
});

export const userStatusFilterSchema = z.object({
  equals: userStatusSchema.optional(),
  in: z.array(userStatusSchema).optional(),
  notIn: z.array(userStatusSchema).optional(),
});

export const userWhereInputSchema = z.object({
  id: userUuidFilterSchema.optional(),
  email: userStringFilterSchema.optional(),
  userName: userStringFilterSchema.optional(),
  status: userStatusFilterSchema.optional(),
  rolesHas: z.string().optional(),
  verifiedAt: userDateTimeFilterSchema.optional(),
  createdAt: userDateTimeFilterSchema.optional(),
  updatedAt: userDateTimeFilterSchema.optional(),
});

export const userOrderByInputSchema = z
  .object({
    id: userSortOrderSchema.optional(),
    email: userSortOrderSchema.optional(),
    userName: userSortOrderSchema.optional(),
    status: userSortOrderSchema.optional(),
    verifiedAt: userSortOrderSchema.optional(),
    createdAt: userSortOrderSchema.optional(),
    updatedAt: userSortOrderSchema.optional(),
  })
  .refine((args) => Object.values(args).some(Boolean), {
    message: 'At least one orderBy field is required',
  });

export const userPaginationInputSchema = z.object({
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
});

export type UserWhereUniqueInputType = z.infer<typeof userWhereUniqueInputSchema>;
export type UserWhereInputType = z.infer<typeof userWhereInputSchema>;
export type UserOrderByInputType = z.infer<typeof userOrderByInputSchema>;
export type UserPaginationInputType = z.infer<typeof userPaginationInputSchema>;
