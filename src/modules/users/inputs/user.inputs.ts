import { builder } from '@/core/lib/pothos-builder';
import { UserWhereUniqueInputSchema } from '../schemas';

/**
 * GraphQL input: GetUserWhereUniqueInput
 *
 * This input exposes a minimal set of searchable user identifiers:
 * - `id`       : user UUID
 * - `email`    : user email address
 * - `userName` : username string
 *
 * Runtime validation is performed with `UserWhereUniqueInputSchema` to
 * ensure caller intent (for example, the schema may require exactly one
 * of the fields to be present). Use this input when resolving queries
 * that expect a unique or narrowly-scoped user lookup.
 */
export const getUserWhereUniqueInput = builder
  .inputType('GetUserWhereUniqueInput', {
    fields: (t) => ({
      id: t.string({ required: false }),
      email: t.string({ required: false }),
      userName: t.string({ required: false }),
    }),
  })
  .validate(UserWhereUniqueInputSchema);
