import { z } from 'zod';

export const dateTimeFilterSchema = z.object({
  equals: z.iso.datetime('Invalid datetime').optional(),
  in: z.array(z.iso.datetime('Invalid datetime')).optional(),
  notIn: z.array(z.iso.datetime('Invalid datetime')).optional(),
  lt: z.iso.datetime('Invalid datetime').optional(),
  lte: z.iso.datetime('Invalid datetime').optional(),
  gt: z.iso.datetime('Invalid datetime').optional(),
  gte: z.iso.datetime('Invalid datetime').optional(),
});
