/**
 * Schema builder para la API GraphQL.
 *
 * Este archivo centraliza la creación y configuración de la instancia única
 * de `SchemaBuilder` usada por toda la aplicación. Incluye:
 *
 * - Plugins necesarios: `PrismaPlugin` (integra Prisma Client con Pothos) y
 *   `ValidationPlugin` (permite reglas de validación en campos/inputs).
 * - Tipado del builder con los tipos generados por Prisma para mantener
 *   coherencia entre el esquema GraphQL y el modelo de datos.
 * - Declaración de scalars y mapeo de enums Prisma → GraphQL.
 *
 * Cómo usar:
 * - Importar `builder` desde `src/schema/builder.ts` y definir entidades
 *   con `builder.prismaObject(...)` o campos con `builder.queryType` y
 *   `builder.mutationType` en los módulos/resolvers.
 * - Para agregar scalars/enum adicionales, declararlos aquí para que estén
 *   disponibles globalmente.
 *
 * Consideraciones:
 * - Mantén la lógica de negocio en servicios; el builder solo define el
 *   esquema y mapeos.
 * - Si prefieres validación estricta de `DateTime`, reemplaza la estrategia
 *   de fallback en `parseValue` por una comprobación que arroje un error.
 */
import { prisma } from '@/database/prisma.service';
import { UserStatus } from '@/database/prisma/generated/client';
import type PrismaTypes from '@/database/prisma/generated/pothos-prisma-types';
import { getDatamodel } from '@/database/prisma/generated/pothos-prisma-types';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import ValidationPlugin from '@pothos/plugin-validation';

/**
 * Exporta una instancia única de `SchemaBuilder` tipada con los tipos
 * generados por Prisma. Aquí se declaran también los scalars personalizados
 * que se usarán en el schema (ej. `DateTime`, `File`).
 */
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
  plugins: [PrismaPlugin, PrismaUtils, ValidationPlugin],
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
  },
});

/**
 * Filtros de ejemplo para campos de tipo `String` y `DateTime`. Estos filtros
 * se pueden usar en los resolvers para permitir consultas más flexibles (ej.
 * buscar usuarios por email que contenga cierta cadena o por fecha de creación
 * mayor a una fecha dada). Personaliza los operadores disponibles según las
 * necesidades de tu aplicación.
 */
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

/**
 * Mapea el enum de Prisma `UserStatus` a un enum GraphQL llamado `UserStatus`.
 * Usar este enum en los tipos/inputs garantiza que los valores sean consistentes
 * con el modelo de datos en la base de datos.
 */
export const UserStatusEnum = builder.enumType(UserStatus, {
  name: 'UserStatus',
});

/**
 * Scalar `DateTime`.
 *
 * - serialize: convierte un `Date` de JavaScript a una cadena ISO para que el
 *   cliente reciba un formato interoperable.
 * - parseValue: acepta una cadena ISO (o cualquier valor) y devuelve una
 *   instancia de `Date` para su uso en resolvers/servicios del servidor.
 *
 * Nota sobre validación: hoy la implementación hace un fallback a `new Date()`
 * cuando el valor no tiene el formato esperado. Esto evita errores en tiempo
 * *de ejecución* pero admite valores no válidos silenciosamente. Si se
 * prefiere validar estrictamente (recomendada en muchos casos), reemplazar
 * `parseValue` por una función que verifique el formato ISO y lance un error
 * cuando sea inválido.
 */
builder.scalarType('DateTime', {
  serialize: (n) => (n instanceof Date ? n.toISOString() : new Date().toISOString()),
  parseValue: (n) => (typeof n === 'string' ? new Date(n) : new Date()),
});

// Tipos raíz vacíos: se extienden en los módulos/resolvers del proyecto.
builder.queryType({});
builder.mutationType({});
builder.subscriptionType({});
