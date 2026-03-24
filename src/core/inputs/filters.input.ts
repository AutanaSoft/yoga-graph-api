import { builder } from '@/core/lib/pothos-builder';

/**
 * Common GraphQL filter input types shared across modules.
 *
 * These inputs mirror common Prisma filter shapes and are declared with
 * the Pothos `builder.inputType`. Use them in resolver arguments when
 * implementing filtering for lists or single-record queries.
 */

/**
 * UuidFilterInput
 *
 * Filters for UUID fields.
 *
 * Fields:
 * - `equals`  : exact UUID match (string).
 * - `in`      : array of UUID strings to match any.
 * - `notIn`   : array of UUID strings to exclude.
 *
 * Intended for querying entities by UUID identifiers.
 */
export const uuidFilterInput = builder.inputType('UuidFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
  }),
});

/**
 * StringFilterInput
 *
 * Generic string filters for textual fields.
 *
 * Fields:
 * - `equals`     : exact match.
 * - `in`         : array of strings to match any.
 * - `notIn`      : array of strings to exclude.
 * - `contains`   : substring match.
 * - `startsWith` : prefix match.
 * - `endsWith`   : suffix match.
 *
 * These operators correspond to common database/text search semantics.
 */
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

/**
 * DateTimeFilterInput
 *
 * Filters for timestamp/datetime fields.
 *
 * Fields expect date-time values as ISO 8601 strings.
 *
 * Operators:
 * - `equals`, `in`, `notIn` for equality checks.
 * - `lt`, `lte`, `gt`, `gte` for range comparisons.
 *
 * Use this input when filtering by created/updated or other temporal
 * fields. Ensure callers provide valid ISO 8601 strings.
 */
export const dateTimeFilterInput = builder.inputType('DateTimeFilterInput', {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
    lt: t.string({ required: false }),
    lte: t.string({ required: false }),
    gt: t.string({ required: false }),
    gte: t.string({ required: false }),
  }),
});

/**
 * EnumFilterInput
 *
 * Filters for enum-backed fields. Values must be enum member names
 * (strings) that the GraphQL schema accepts.
 *
 * Fields:
 * - `equals` : exact enum match.
 * - `in`     : array of enum member names to match any.
 * - `notIn`  : array of enum member names to exclude.
 */
export const enumFilterInput = builder.inputType(`EnumFilterInput`, {
  fields: (t) => ({
    equals: t.string({ required: false }),
    in: t.stringList({ required: false }),
    notIn: t.stringList({ required: false }),
  }),
});

/**
 * SortOrderInput
 *
 * Request ordering of query results by a single field.
 *
 * - `sort` must be the name of a sortable field on the target entity
 *   (e.g. `createdAt`, `userName`, `email`).
 *
 * Note: only the field name is accepted. To support direction, add a
 * `direction` enum (e.g. `ASC` | `DESC`) and enforce valid field names
 * in the resolver or service layer.
 */
export const sortOrderInput = builder.inputType('SortOrderInput', {
  fields: (t) => ({
    sort: t.string({ required: true, description: 'Field to sort by' }),
  }),
});
