import { builder } from '@/core/lib/pothos-builder';

export const uuidFilterInput = builder.inputType('UuidFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
  }),
});

export const emailFilterInput = builder.inputType('EmailFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
    contains: t.string({ required: false }),
    startsWith: t.string({ required: false }),
    endsWith: t.string({ required: false }),
  }),
});

export const stringFilterInput = builder.inputType('StringFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
    contains: t.string({ required: false }),
    startsWith: t.string({ required: false }),
    endsWith: t.string({ required: false }),
  }),
});
