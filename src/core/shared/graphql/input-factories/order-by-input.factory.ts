import { sortOrderSchema } from '@/core/shared/enums';
import { z } from 'zod';

export const createOrderBySchema = <TField extends string>(
  fields: readonly [TField, ...TField[]],
) => {
  const shape = fields.reduce(
    (accumulator, field) => ({
      ...accumulator,
      [field]: sortOrderSchema.optional(),
    }),
    {} as Record<TField, z.ZodOptional<typeof sortOrderSchema>>,
  );

  return z.object(shape).refine((value) => Object.values(value).some(Boolean), {
    message: 'At least one orderBy field is required',
  });
};
