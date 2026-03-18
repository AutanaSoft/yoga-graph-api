import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ValidationPlugin from '@pothos/plugin-validation';
import type PrismaTypes from '@/database/prisma/generated/pothos';
import { getDatamodel } from '@/database/prisma/generated/pothos';
import { prisma } from '@/database/prisma.service';
import { UserStatus } from '@/database/prisma/generated/client';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    File: {
      Input: File;
      Output: File;
    };
  };
}>({
  plugins: [PrismaPlugin, ValidationPlugin],
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
  },
});

export const UserStatusEnum = builder.enumType(UserStatus, {
  name: 'UserStatus',
});

builder.scalarType('DateTime', {
  serialize: (n) => (n instanceof Date ? n.toISOString() : new Date().toISOString()),
  parseValue: (n) => (typeof n === 'string' ? new Date(n) : new Date()),
});

builder.queryType({});
builder.mutationType({});
