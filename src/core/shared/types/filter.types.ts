import type { z } from 'zod';
import type {
  dateTimeFilterSchema,
  stringFilterSchema,
  uuidFilterSchema,
} from '@/core/shared/schemas';

export type StringFilterType = z.infer<typeof stringFilterSchema>;
export type UuidFilterType = z.infer<typeof uuidFilterSchema>;
export type DateTimeFilterType = z.infer<typeof dateTimeFilterSchema>;
