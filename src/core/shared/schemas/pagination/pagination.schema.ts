import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  take: z.number().int().min(1).max(100).default(20),
});

export type PaginationType = z.infer<typeof paginationSchema>;
