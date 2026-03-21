/* eslint-disable */
import type { Prisma, User, UserProfile } from './client.js';
import type { PothosPrismaDatamodel } from '@pothos/plugin-prisma';
export default interface PrismaTypes {
  User: {
    Name: 'User';
    Shape: User;
    Include: Prisma.UserInclude;
    Select: Prisma.UserSelect;
    OrderBy: Prisma.UserOrderByWithRelationInput;
    WhereUnique: Prisma.UserWhereUniqueInput;
    Where: Prisma.UserWhereInput;
    Create: Prisma.UserCreateInput;
    Update: Prisma.UserUpdateInput;
    RelationName: 'profile';
    ListRelations: never;
    Relations: {
      profile: {
        Shape: UserProfile | null;
        Name: 'UserProfile';
        Nullable: true;
      };
    };
  };
  UserProfile: {
    Name: 'UserProfile';
    Shape: UserProfile;
    Include: Prisma.UserProfileInclude;
    Select: Prisma.UserProfileSelect;
    OrderBy: Prisma.UserProfileOrderByWithRelationInput;
    WhereUnique: Prisma.UserProfileWhereUniqueInput;
    Where: Prisma.UserProfileWhereInput;
    Create: Prisma.UserProfileCreateInput;
    Update: Prisma.UserProfileUpdateInput;
    RelationName: 'user';
    ListRelations: never;
    Relations: {
      user: {
        Shape: User;
        Name: 'User';
        Nullable: false;
      };
    };
  };
}
export function getDatamodel(): PothosPrismaDatamodel {
  return JSON.parse(
    '{"datamodel":{"models":{"User":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"UserStatus","kind":"enum","name":"status","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"roles","isRequired":true,"isList":true,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"email","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userName","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"password","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"verifiedAt","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":true},{"type":"UserProfile","kind":"object","name":"profile","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"UserToUserProfile","relationFromFields":[],"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]},"UserProfile":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"firstName","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"lastName","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"phone","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"country","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":true},{"type":"User","kind":"object","name":"user","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"UserToUserProfile","relationFromFields":["userId"],"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]}}}}',
  );
}
