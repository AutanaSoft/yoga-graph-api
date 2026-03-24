import { builder } from '@/core/platform/graphql';
import { paginationSchema } from '@/core/shared/schemas';

export const paginationInput = builder
  .inputType('PaginationInput', {
    fields: (t) => ({
      page: t.int({ required: false }),
      take: t.int({ required: false }),
    }),
  })
  .validate(paginationSchema.partial());
