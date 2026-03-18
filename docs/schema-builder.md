# `src/schema/builder.ts` — Documentación

Resumen

- `builder.ts` crea y exporta una instancia central de `SchemaBuilder` de Pothos configurada para este proyecto.
- Conecta Pothos con Prisma (`@pothos/plugin-prisma`) y añade el plugin de validación (`@pothos/plugin-validation`).

Propósito

- Centralizar la configuración del esquema GraphQL (scalars, enums, plugins, enlace a Prisma Client).
- Garantizar que todos los módulos/resolvers usen la misma instancia tipada del `builder`.

Puntos clave

- Archivo: [src/schema/builder.ts](src/schema/builder.ts)
- Exportaciones principales:
  - `builder`: instancia compartida de `SchemaBuilder` (tipada con `PrismaTypes`).
  - `UserStatusEnum`: enum GraphQL mapeado desde `UserStatus` de Prisma.

Scalars y comportamientos

- `DateTime`:
  - `serialize`: convierte `Date` a string ISO (respuesta GraphQL).
  - `parseValue`: acepta strings ISO y convierte a `Date`.
  - Nota: la implementación actual devuelve `new Date()` para valores inesperados; cambiar si se requiere validación estricta.

Prisma

- El builder está configurado con `prisma` y `dmmf`:
  - `client`: instancia compartida en `src/database/prisma.service.ts`.
  - `dmmf`: obtenido de los artefactos generados en `src/database/prisma/generated`.
- No editar los archivos generados; los cambios deben hacerse en `schema.prisma` y regenerarse con `pnpm exec prisma generate`.

Convenciones de uso

- En los módulos, importar `builder` desde `src/schema/builder.ts` y registrar entidades con `builder.prismaObject`.
- Dividir resolvers en `*.queries.ts` y `*.mutations.ts` y `import '../entities/<entity>.entity'` donde se necesite exponer tipos.

Ejemplo rápido

- Definir un input validado con Zod y usarlo en una mutación:
  1. Crear el input con `builder.inputType(...).validate(zSchema)`.
  2. En la mutación, usar `args: { input: t.arg({ type: CreateUserInput, required: true }) }`.
  3. Delegar la lógica a `UsersService`.

Notas de mantenimiento

- Si se actualiza el esquema Prisma o los modelos, actualizar `dmmf` (regenera) y ejecutar `pnpm exec prisma generate`.
- Mantener la instancia de `prisma` en `src/database/prisma.service.ts` para evitar múltiples clientes.

Referencias

- `src/schema/builder.ts`
- `src/database/prisma/schema.prisma`
- `src/database/prisma/generated`
- Ejemplos en `src/modules/users`
