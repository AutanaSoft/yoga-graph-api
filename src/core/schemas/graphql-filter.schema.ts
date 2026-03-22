import z from 'zod';

export const ModeFilterSchema = z.enum(['default', 'insensitive']);

export const UuidFilterSchema = z.object({
  equals: z.uuid('Invalid ID format').optional(),
  in: z.array(z.uuid('Invalid ID format')).optional(),
  notIn: z.array(z.uuid('Invalid ID format')).optional(),
});

export const UuidFilterUniqueSchema = z.uuid('Invalid ID format');

export const StringFilterSchema = z.object({
  equals: z.string().optional(),
  in: z.array(z.string()).optional(),
  notIn: z.array(z.string()).optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: ModeFilterSchema.optional(),
});

export const StringFilterUniqueSchema = z.string().nonempty();

export const EmailFilterSchema = z
  .object({
    equals: z.email().optional(),
    in: z.array(z.email()).optional(),
    notIn: z.array(z.email()).optional(),
    contains: z.string().nonempty().optional(),
    startsWith: z.string().nonempty().optional(),
    endsWith: z.string().nonempty().optional(),
  })
  .transform((data) => {
    const record = data as Record<string, unknown>;
    Object.keys(record).forEach((key) => {
      if (typeof record[key] === 'string') {
        record[key] = record[key].trim().toLowerCase();
      } else if (Array.isArray(record[key])) {
        record[key] = record[key].map((item: string) => item.trim().toLowerCase());
      }
    });
    return data;
  });

export const EmailFilterUniqueSchema = z.email().transform((data) => data.trim().toLowerCase());

export const DateTimeFilterSchema = z.object({
  equals: z.iso.datetime().optional(),
  in: z.array(z.iso.datetime()).optional(),
  notIn: z.array(z.iso.datetime()).optional(),
  lt: z.iso.datetime().optional(),
  lte: z.iso.datetime().optional(),
  gt: z.iso.datetime().optional(),
  gte: z.iso.datetime().optional(),
});

export const DateTimeFilterUniqueSchema = z.iso.datetime();
