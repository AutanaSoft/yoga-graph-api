import { z } from 'zod';

export const emailFilterSchema = z
  .object({
    equals: z.email('Invalid email format').optional(),
    in: z.array(z.email('Invalid email format')).optional(),
    notIn: z.array(z.email('Invalid email format')).optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
  })
  .transform((data) => {
    const record = data as Record<string, unknown>;

    Object.keys(record).forEach((key) => {
      if (typeof record[key] === 'string') {
        record[key] = record[key].trim().toLowerCase();
      } else if (Array.isArray(record[key])) {
        const normalizedValues: string[] = [];

        for (const entry of record[key]) {
          if (typeof entry === 'string') {
            normalizedValues.push(entry.trim().toLowerCase());
          }
        }

        record[key] = normalizedValues;
      }
    });

    return data;
  });
