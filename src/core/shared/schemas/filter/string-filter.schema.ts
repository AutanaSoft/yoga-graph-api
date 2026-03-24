import { z } from 'zod';

export const stringFilterSchema = z.object({
  equals: z.string().optional(),
  in: z.array(z.string()).optional(),
  notIn: z.array(z.string()).optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
});
