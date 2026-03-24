import { prisma } from '@/database/prisma.service';
import { getDatamodel } from '@/database/prisma/generated/pothos-prisma-types';
import type PrismaTypes from '@/database/prisma/generated/pothos-prisma-types';
import SchemaBuilder from '@pothos/core';
import ComplexityPlugin from '@pothos/plugin-complexity';
import PrismaPlugin from '@pothos/plugin-prisma';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ValidationPlugin from '@pothos/plugin-validation';
import { GraphQLContext } from './context';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: GraphQLContext;
  AuthScopes: {
    public: boolean;
    loggedIn: boolean;
    hasRole: string;
  };
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
  plugins: [ScopeAuthPlugin, PrismaPlugin, ValidationPlugin, ComplexityPlugin],
  // @ts-expect-error - Pothos typings may require full TS server restart
  authScopes: (context: GraphQLContext) => ({
    public: true,
    loggedIn: !!context.user,
    hasRole: (role: string) => context.user?.roles.includes(role) ?? false,
  }),
  complexity: {
    defaultComplexity: 1,
    defaultListMultiplier: 10,
    limit: {
      complexity: 200,
    },
  },
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
  },
});

builder.scalarType('DateTime', {
  serialize: (value) => (value instanceof Date ? value.toISOString() : new Date().toISOString()),
  parseValue: (value) => (typeof value === 'string' ? new Date(value) : new Date()),
});

builder.queryType({});
builder.mutationType({});
