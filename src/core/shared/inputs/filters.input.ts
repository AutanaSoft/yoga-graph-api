import { builder } from '@/core/platform/graphql';
import { dateTimeFilterSchema, stringFilterSchema, uuidFilterSchema } from '@/core/shared/schemas';

export const uuidFilterInput = builder
  .inputType('UuidFilterInput', {
    fields: (t) => ({
      equals: t.string({ required: false }),
      in: t.stringList({ required: false }),
      notIn: t.stringList({ required: false }),
    }),
  })
  .validate(uuidFilterSchema);

export const stringFilterInput = builder
  .inputType('StringFilterInput', {
    fields: (t) => ({
      equals: t.string({ required: false }),
      in: t.stringList({ required: false }),
      notIn: t.stringList({ required: false }),
      contains: t.string({ required: false }),
      startsWith: t.string({ required: false }),
      endsWith: t.string({ required: false }),
    }),
  })
  .validate(stringFilterSchema);

export const dateTimeFilterInput = builder
  .inputType('DateTimeFilterInput', {
    fields: (t) => ({
      equals: t.string({ required: false }),
      in: t.stringList({ required: false }),
      notIn: t.stringList({ required: false }),
      lt: t.string({ required: false }),
      lte: t.string({ required: false }),
      gt: t.string({ required: false }),
      gte: t.string({ required: false }),
    }),
  })
  .validate(dateTimeFilterSchema);
