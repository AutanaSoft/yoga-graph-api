import { prisma } from '@/database/prisma.service';
import type PrismaTypes from '@/database/prisma/generated/pothos-prisma-types';
import { getDatamodel } from '@/database/prisma/generated/pothos-prisma-types';
import SchemaBuilder from '@pothos/core';
import ComplexityPlugin from '@pothos/plugin-complexity';
import PrismaPlugin from '@pothos/plugin-prisma';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ValidationPlugin from '@pothos/plugin-validation';
import { GraphQLContext } from '../plugins/graphql/context';

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
  // @ts-expect-error - Pothos typings a veces requieren un reinicio completo del server TS para registrar las extensiones de plugins
  authScopes: (context: GraphQLContext) => ({
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

builder.scalarType('DateTime', {
  serialize: (n) => (n instanceof Date ? n.toISOString() : new Date().toISOString()),
  parseValue: (n) => (typeof n === 'string' ? new Date(n) : new Date()),
});

// Tipos raíz vacíos: se extienden en los módulos/resolvers del proyecto.
builder.queryType({});
// builder.mutationType({});
