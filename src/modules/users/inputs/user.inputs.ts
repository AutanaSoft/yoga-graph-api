import {
  createEnumFilterInput,
  dateTimeFilterInput,
  paginationInput,
  sortOrderEnum,
  stringFilterInput,
  uuidFilterInput,
} from '@/core/shared';
import { builder } from '@/core/platform/graphql';
import { UserStatusEnum } from '../enum';
import {
  createUserDataInputSchema,
  updateUserDataInputSchema,
  userOrderByInputSchema,
  userPaginationInputSchema,
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

export const userStatusFilterInput = createEnumFilterInput(
  'UserStatusFilterInput',
  UserStatusEnum,
).validate(userWhereInputSchema.shape.status.unwrap());

export const getUsersWhereInput = builder
  .inputType('GetUsersWhereInput', {
    fields: (t) => ({
      id: t.field({ type: uuidFilterInput, required: false }),
      email: t.field({ type: stringFilterInput, required: false }),
      userName: t.field({ type: stringFilterInput, required: false }),
      status: t.field({ type: userStatusFilterInput, required: false }),
      rolesHas: t.string({ required: false }),
      verifiedAt: t.field({ type: dateTimeFilterInput, required: false }),
      createdAt: t.field({ type: dateTimeFilterInput, required: false }),
      updatedAt: t.field({ type: dateTimeFilterInput, required: false }),
    }),
  })
  .validate(userWhereInputSchema);

export const userOrderByInput = builder
  .inputType('UserOrderByInput', {
    fields: (t) => ({
      id: t.field({ type: sortOrderEnum, required: false }),
      email: t.field({ type: sortOrderEnum, required: false }),
      userName: t.field({ type: sortOrderEnum, required: false }),
      status: t.field({ type: sortOrderEnum, required: false }),
      verifiedAt: t.field({ type: sortOrderEnum, required: false }),
      createdAt: t.field({ type: sortOrderEnum, required: false }),
      updatedAt: t.field({ type: sortOrderEnum, required: false }),
    }),
  })
  .validate(userOrderByInputSchema);

export const userPaginationInput = paginationInput.validate(userPaginationInputSchema);

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
