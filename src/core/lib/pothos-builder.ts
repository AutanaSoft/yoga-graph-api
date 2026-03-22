import { prisma } from '@/database/prisma.service';
import { UserStatus } from '@/database/prisma/generated/client';
import type PrismaTypes from '@/database/prisma/generated/pothos-prisma-types';
import { getDatamodel } from '@/database/prisma/generated/pothos-prisma-types';
import SchemaBuilder from '@pothos/core';
import ComplexityPlugin from '@pothos/plugin-complexity';
import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ValidationPlugin from '@pothos/plugin-validation';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {
    // TODO: Se poblará en el futuro cuando se implemente la autenticación por JWT
    user?: { id: string; roles: string[] };
  };
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
  plugins: [ScopeAuthPlugin, PrismaPlugin, PrismaUtils, ValidationPlugin, ComplexityPlugin],
  // @ts-expect-error - Pothos typings a veces requieren un reinicio completo del server TS para registrar las extensiones de plugins
  authScopes: (context: { user?: { id: string; roles: string[] } }) => ({
    public: true,
    // TODO: Estas reglas se activarán una vez que el context reciba el token JWT real
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

export const UuidFilterInput = builder.prismaFilter('String', {
  name: 'UuidFilter',
  ops: ['equals', 'in', 'notIn'],
});

export const StringFilterInput = builder.prismaFilter('String', {
  name: 'StringFilter',
  ops: ['equals', 'in', 'notIn', 'contains', 'startsWith', 'endsWith', 'mode'],
});

export const DateTimeFilterInput = builder.prismaFilter('DateTime', {
  name: 'DateTimeFilter',
  ops: ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte'],
});

export const UserStatusEnum = builder.enumType(UserStatus, {
  name: 'UserStatus',
});

builder.scalarType('DateTime', {
  serialize: (n) => (n instanceof Date ? n.toISOString() : new Date().toISOString()),
  parseValue: (n) => (typeof n === 'string' ? new Date(n) : new Date()),
});

// Tipos raíz vacíos: se extienden en los módulos/resolvers del proyecto.
builder.queryType({});
builder.mutationType({});
