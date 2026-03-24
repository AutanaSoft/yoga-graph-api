import { builder } from '@/core/platform/graphql';
import { Prisma } from '@/database/prisma/generated/client';
import { z } from 'zod';

export const sortOrderEnum = builder.enumType(Prisma.SortOrder, {
  name: 'SortOrder',
});

export const sortOrderSchema = z.enum(['asc', 'desc'], 'Sort order must be asc or desc');

export type SortOrderType = z.infer<typeof sortOrderSchema>;
