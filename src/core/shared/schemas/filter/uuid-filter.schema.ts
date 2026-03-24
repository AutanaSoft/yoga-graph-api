import { z } from 'zod';

export const uuidFilterSchema = z.object({
  equals: z.uuid('Invalid ID format').optional(),
  in: z.array(z.uuid('Invalid ID format')).optional(),
  notIn: z.array(z.uuid('Invalid ID format')).optional(),
});
