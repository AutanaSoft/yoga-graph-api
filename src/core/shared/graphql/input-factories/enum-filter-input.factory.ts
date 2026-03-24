import { builder } from '@/core/platform/graphql';

type EnumTypeRef = Parameters<typeof builder.inputType>[0] | object;

export const createEnumFilterInput = (inputName: string, enumType: EnumTypeRef) =>
  builder.inputType(inputName, {
    fields: (t) => ({
      equals: t.field({ type: enumType as never, required: false }),
      in: t.field({ type: [enumType] as never, required: false }),
      notIn: t.field({ type: [enumType] as never, required: false }),
    }),
  });
