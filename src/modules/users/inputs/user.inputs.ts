import { builder, StringFilterInput, UuidFilterInput } from '@/core/lib/pothos-builder';
import { EmailFilterSchema, StringFilterSchema, UuidFilterSchema } from '@/core/schemas';
import z from 'zod';
import { CreateUserSchema, UpdateUserSchema } from '../schemas';

const USER_LOOKUP_REQUIRED_MESSAGE =
  'At least one lookup field is required: id, email, or userName.';

type UserLookupFields = {
  id?: unknown;
  email?: unknown;
  userName?: unknown;
};

// Reusable predicate to enforce at least one lookup field in search inputs.
const hasUserLookupField = ({ id, email, userName }: UserLookupFields): boolean =>
  Boolean(id || email || userName);

const UserWhereValidationSchema = z
  .object({
    id: UuidFilterSchema.optional(),
    email: EmailFilterSchema.optional(),
    userName: StringFilterSchema.optional(),
  })
  .refine(hasUserLookupField, {
    message: USER_LOOKUP_REQUIRED_MESSAGE,
  });

const UserWhereUniqueValidationSchema = z
  .object({
    id: z.uuid().optional(),
    email: z.email().optional(),
    userName: z.string().optional(),
  })
  .refine(hasUserLookupField, {
    message: USER_LOOKUP_REQUIRED_MESSAGE,
  });

export const CreateUserInput = builder
  .prismaCreate('UserModel', {
    name: 'CreateUserInput',
    fields: () => ({
      roles: 'String',
      email: 'String',
      userName: 'String',
      password: 'String',
    }),
  })
  .validate(CreateUserSchema);

export const UserUpdateInput = builder
  .prismaUpdate('UserModel', {
    name: 'UserUpdateInput',
    fields: () => ({
      email: 'String',
      userName: 'String',
      password: 'String',
    }),
  })
  .validate(UpdateUserSchema);

export const UserWhereInput = builder
  .prismaWhere('UserModel', {
    fields: {
      id: UuidFilterInput,
      email: StringFilterInput,
      userName: StringFilterInput,
    },
  })
  .validate(UserWhereValidationSchema);

export const UserWhereUniqueInput = builder
  .prismaWhereUnique('UserModel', {
    fields: () => ({
      id: 'String',
      email: 'String',
      userName: 'String',
    }),
  })
  .validate(UserWhereUniqueValidationSchema);
