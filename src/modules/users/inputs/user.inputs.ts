import { builder } from '@/core/lib/pothos-builder';
import { SortOrderEnum, UserStatusEnum } from '../enum';
import {
  createUserDataInputSchema,
  updateUserDataInputSchema,
  userOrderByInputSchema,
  userWhereInputSchema,
  userWhereUniqueInputSchema,
} from '../schemas';

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
  .validate(userWhereUniqueInputSchema);

export const userStringFilterInput = builder
  .inputType('UserStringFilterInput', {
    fields: (t) => ({
      equals: t.string({ required: false }),
      contains: t.string({ required: false }),
      startsWith: t.string({ required: false }),
      endsWith: t.string({ required: false }),
      in: t.stringList({ required: false }),
      notIn: t.stringList({ required: false }),
    }),
  })
  .validate(userWhereInputSchema.shape.email.unwrap());

export const userUuidFilterInput = builder
  .inputType('UserUuidFilterInput', {
    fields: (t) => ({
      equals: t.string({ required: false }),
      in: t.stringList({ required: false }),
      notIn: t.stringList({ required: false }),
    }),
  })
  .validate(userWhereInputSchema.shape.id.unwrap());

export const userDateTimeFilterInput = builder
  .inputType('UserDateTimeFilterInput', {
    fields: (t) => ({
      equals: t.string({ required: false }),
      lt: t.string({ required: false }),
      lte: t.string({ required: false }),
      gt: t.string({ required: false }),
      gte: t.string({ required: false }),
    }),
  })
  .validate(userWhereInputSchema.shape.createdAt.unwrap());

export const userStatusFilterInput = builder
  .inputType('UserStatusFilterInput', {
    fields: (t) => ({
      equals: t.field({ type: UserStatusEnum, required: false }),
      in: t.field({ type: [UserStatusEnum], required: false }),
      notIn: t.field({ type: [UserStatusEnum], required: false }),
    }),
  })
  .validate(userWhereInputSchema.shape.status.unwrap());

export const getUsersWhereInput = builder
  .inputType('GetUsersWhereInput', {
    fields: (t) => ({
      id: t.field({ type: userUuidFilterInput, required: false }),
      email: t.field({ type: userStringFilterInput, required: false }),
      userName: t.field({ type: userStringFilterInput, required: false }),
      status: t.field({ type: userStatusFilterInput, required: false }),
      rolesHas: t.string({ required: false }),
      verifiedAt: t.field({ type: userDateTimeFilterInput, required: false }),
      createdAt: t.field({ type: userDateTimeFilterInput, required: false }),
      updatedAt: t.field({ type: userDateTimeFilterInput, required: false }),
    }),
  })
  .validate(userWhereInputSchema);

export const userOrderByInput = builder
  .inputType('UserOrderByInput', {
    fields: (t) => ({
      id: t.field({ type: SortOrderEnum, required: false }),
      email: t.field({ type: SortOrderEnum, required: false }),
      userName: t.field({ type: SortOrderEnum, required: false }),
      status: t.field({ type: SortOrderEnum, required: false }),
      verifiedAt: t.field({ type: SortOrderEnum, required: false }),
      createdAt: t.field({ type: SortOrderEnum, required: false }),
      updatedAt: t.field({ type: SortOrderEnum, required: false }),
    }),
  })
  .validate(userOrderByInputSchema);

export const createUserDataInput = builder
  .inputType('CreateUserDataInput', {
    fields: (t) => ({
      email: t.string({ required: true }),
      userName: t.string({ required: true }),
      password: t.string({ required: true }),
      roles: t.stringList({ required: false }),
    }),
  })
  .validate(createUserDataInputSchema);

export const updateUserDataInput = builder
  .inputType('UpdateUserDataInput', {
    fields: (t) => ({
      email: t.string({ required: false }),
      userName: t.string({ required: false }),
      status: t.field({ type: UserStatusEnum, required: false }),
      roles: t.stringList({ required: false }),
      verifiedAt: t.string({ required: false }),
    }),
  })
  .validate(updateUserDataInputSchema);
