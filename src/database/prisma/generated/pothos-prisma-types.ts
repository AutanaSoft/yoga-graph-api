/* eslint-disable */
import type { Prisma, UserModel, ProfileModel } from './client.js';
import type { PothosPrismaDatamodel } from '@pothos/plugin-prisma';
export default interface PrismaTypes {
  UserModel: {
    Name: 'UserModel';
    Shape: UserModel;
    Include: Prisma.UserModelInclude;
    Select: Prisma.UserModelSelect;
    OrderBy: Prisma.UserModelOrderByWithRelationInput;
    WhereUnique: Prisma.UserModelWhereUniqueInput;
    Where: Prisma.UserModelWhereInput;
    Create: {};
    Update: {};
    RelationName: 'profile';
    ListRelations: never;
    Relations: {
      profile: {
        Shape: ProfileModel | null;
        Name: 'ProfileModel';
        Nullable: true;
      };
    };
  };
  ProfileModel: {
    Name: 'ProfileModel';
    Shape: ProfileModel;
    Include: Prisma.ProfileModelInclude;
    Select: Prisma.ProfileModelSelect;
    OrderBy: Prisma.ProfileModelOrderByWithRelationInput;
    WhereUnique: Prisma.ProfileModelWhereUniqueInput;
    Where: Prisma.ProfileModelWhereInput;
    Create: {};
    Update: {};
    RelationName: 'user';
    ListRelations: never;
    Relations: {
      user: {
        Shape: UserModel;
        Name: 'UserModel';
        Nullable: false;
      };
    };
  };
}
export function getDatamodel(): PothosPrismaDatamodel {
  return JSON.parse(
    '{"datamodel":{"models":{"UserModel":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"UserStatus","kind":"enum","name":"status","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"UserRole","kind":"enum","name":"roles","isRequired":true,"isList":true,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"email","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userName","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"password","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"verifiedAt","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":true},{"type":"ProfileModel","kind":"object","name":"profile","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"ProfileModelToUserModel","relationFromFields":[],"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]},"ProfileModel":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"firstName","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"lastName","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"phone","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"country","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":true},{"type":"UserModel","kind":"object","name":"user","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"ProfileModelToUserModel","relationFromFields":["userId"],"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]}}}}',
  );
}
