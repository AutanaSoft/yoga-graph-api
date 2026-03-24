# Plan de Refactor Core/Shared

## 1) Analisis Actual

### 1.1 Modulo core (`src/core`) hoy

Estructura actual:

- `src/core/lib/`
- `src/core/inputs/`
- `src/core/plugins/`
- `src/core/schemas/`

Hallazgos clave:

- `src/core/inputs/filters.input.ts` ya define inputs GraphQL genericos (`uuidFilterInput`, `stringFilterInput`, `dateTimeFilterInput`, `enumFilterInput`, `sortOrderInput`), pero:
  - no tienen validacion runtime con Zod conectada.
  - `sortOrderInput` es debil (`sort: string`) y no refleja bien la forma de `orderBy` de Prisma.
- `src/core/schemas/graphql-filter.schema.ts` tiene esquemas Zod robustos (UUID/string/email/datetime) y normalizacion, pero:
  - no se estan consumiendo desde los modulos.
  - su estilo y naming no esta alineado con el patron nuevo del modulo users.
- `src/core/lib/pothos-builder.ts` contiene infraestructura compartida (builder/scalars/plugins), lo cual es una preocupacion de plataforma, no de contratos de dominio compartidos.
- Hoy no hay separacion clara entre:
  - **infraestructura de plataforma** (builder/plugins/context)
  - **contratos reutilizables cross-modulo** (inputs/esquemas/tipos)

### 1.2 Codigo reutilizable detectado en users (`src/modules/users`)

Candidatos reutilizables:

- `userStringFilterInput` -> filtro genericamente reutilizable para strings.
- `userUuidFilterInput` -> filtro genericamente reutilizable para UUID.
- `userDateTimeFilterInput` -> filtro genericamente reutilizable para DateTime.
- Contrapartes Zod en `src/modules/users/schemas/user-input.schemas.ts`:
  - `userStringFilterSchema`
  - `userUuidFilterSchema`
  - `userDateTimeFilterSchema`
- El concepto de `userSortOrderSchema` tambien es generico.
- `mapWhereInput` esta duplicado en:
  - `src/modules/users/resolvers/users.queries.ts`
  - `src/modules/users/resolvers/users.mutations.ts`
    Esto conviene extraerlo a un mapper local compartido dentro del modulo users.

No reutilizable (debe quedarse en users):

- `getUsersWhereInput`, `getUserWhereUniqueInput` (campos propios del dominio users).
- `userStatusFilterInput` (depende del enum de users).
- `createUserDataInput`, `updateUserDataInput` (DTOs de users).
- Logica `rolesHas` (especifica de users).

---

## 2) Recomendacion de Nombre para `core`

### Recomendacion principal

Usar una estrategia **hibrida**:

- Mantener el path raiz `core` para evitar un cambio masivo inmediato de imports.
- Reorganizar internamente en:
  - `core/platform` -> infraestructura/runtime.
  - `core/shared` -> contratos reutilizables entre modulos (inputs/schemas/types/enums/factories).

Motivo:

- `core` hoy mezcla infraestructura y compartidos.
- Llamar todo "shared" puede diluir responsabilidades de plataforma.
- Este split mejora claridad sin costo alto de migracion.

### Alternativas

1. **Mantener `core` (recomendado ahora)**
   - Agregar `core/shared` y `core/platform`.
2. **Renombrar `core` -> `platform` + crear `shared`**
   - Semantica mas limpia a largo plazo, pero con mayor costo de migracion.

---

## 3) Estructura Objetivo (alineada a users)

```txt
src/core/
  platform/
    graphql/
      pothos-builder.ts
      context.ts
      graphql.plugin.ts
      index.ts
    fastify/
      correlation.plugin.ts
      security.plugin.ts
      upload.plugin.ts
      index.ts
    index.ts

  shared/
    enums/
      sort-order.enum.ts
      index.ts
    inputs/
      filters.input.ts
      pagination.input.ts
      index.ts
    schemas/
      filter/
        string-filter.schema.ts
        uuid-filter.schema.ts
        date-time-filter.schema.ts
        email-filter.schema.ts
        index.ts
      pagination/
        pagination.schema.ts
        index.ts
      index.ts
    types/
      filter.types.ts
      pagination.types.ts
      index.ts
    graphql/
      input-factories/
        enum-filter-input.factory.ts
        order-by-input.factory.ts
        index.ts
      index.ts
    index.ts

  index.ts
```

Notas:

- Mantener kebab-case en nombres de archivos.
- Mantener nombres de simbolos del codigo en ingles.
- Exponer exports por `index.ts` (barrel) por capa.

---

## 4) Plan de Implementacion Detallado

## Fase A — Reestructura de core sin romper (non-breaking)

1. Crear `src/core/platform` y `src/core/shared`.
2. Mover archivos (con re-exports temporales de compatibilidad):
   - `core/lib/pothos-builder.ts` -> `core/platform/graphql/pothos-builder.ts`
   - `core/plugins/graphql/context.ts` -> `core/platform/graphql/context.ts`
   - `core/plugins/graphql/graphql.plugin.ts` -> `core/platform/graphql/graphql.plugin.ts`
   - `core/plugins/fastify/*.plugin.ts` -> `core/platform/fastify/*`
3. Mantener paths antiguos como wrappers de re-export para no romper imports existentes.
4. Empezar a normalizar imports hacia rutas canonicas nuevas en archivos tocados.

## Fase B — Consolidar filtros compartidos (core + users)

1. Definir esquemas Zod canonicos en:
   - `core/shared/schemas/filter/*.schema.ts`
2. Refactorizar `core/shared/inputs/filters.input.ts` para:
   - validar con Zod via `.validate(...)`.
   - exponer inputs genericos:
     - `uuidFilterInput`
     - `stringFilterInput`
     - `dateTimeFilterInput`
3. Eliminar duplicacion de filtros genericos en `users/inputs/user.inputs.ts`.
4. En users, importar filtros genericos desde `@/core/shared/inputs`.
5. Mantener en users los inputs de dominio (`UserStatusFilterInput`, `GetUsersWhereInput`, etc.).

## Fase C — Contratos compartidos de orderBy y paginacion

1. Crear contrato compartido de sort-order en core/shared:
   - enum GraphQL para sort order.
   - schema Zod para sort order.
2. Agregar contrato de paginacion compartido:
   - `skip`, `take` con limites.
3. Actualizar users para aprovechar estos contratos compartidos.

## Fase D — Extraer mapper local de users

1. Mover `mapWhereInput` duplicado a:
   - `src/modules/users/mappers/user-where.mapper.ts`
2. Reusar en:
   - `users.queries.ts`
   - `users.mutations.ts`
3. Mantener logica de dominio users (`rolesHas -> roles: { has }`) en este mapper.

## Fase E — Indexes, exports y limpieza

1. Crear/normalizar `index.ts` en carpetas nuevas de core.
2. Remover re-exports de compatibilidad cuando no existan consumidores.
3. Normalizar imports:
   - Builder canonico: `@/core/platform/graphql/pothos-builder`
   - Reutilizables compartidos: `@/core/shared/...`
4. Verificar que no queden imports a paths legacy con un grep final.

## Fase F — Validacion tecnica y seguridad de cambios

1. Ejecutar:
   - `pnpm run lint`
   - `pnpm exec tsc --noEmit`
2. Validar boot de schema GraphQL:
   - `src/pothos.schema.ts` debe seguir registrando resolvers.
3. Verificar que no existan nombres de input GraphQL duplicados al centralizar filtros.

---

## 5) Matriz de Migracion (Users -> Core Shared)

Mover a core/shared:

- `userStringFilterInput` (concepto) -> `stringFilterInput`
- `userUuidFilterInput` (concepto) -> `uuidFilterInput`
- `userDateTimeFilterInput` (concepto) -> `dateTimeFilterInput`
- `userSortOrderSchema` (concepto) -> contrato compartido de sort-order

Mantener en users:

- `getUserWhereUniqueInput`
- `getUsersWhereInput`
- `userStatusFilterInput`
- `createUserDataInput`
- `updateUserDataInput`
- `userWhereInputSchema` (agregado de dominio)

Refactor local en users:

- `mapWhereInput` (duplicado) -> `users/mappers/user-where.mapper.ts`

---

## 6) Principios aplicados (legibilidad, simplicidad, performance basica)

- Fuente unica de verdad para filtros compartidos (`core/shared`).
- Menos duplicacion de logica en resolvers (mapper reutilizable en users).
- Frontera clara entre plataforma y contratos compartidos.
- Validacion fuerte en borde con Zod para evitar payloads invalidos.
- Paginacion con limites para control de costo en consultas.

---

## 7) Riesgos y Mitigaciones

Riesgos:

- Rotura de imports por movimiento de archivos.
- Nombres de inputs GraphQL duplicados durante migracion.
- Acoplamiento oculto por exports demasiado amplios.

Mitigaciones:

- Migracion en dos pasos con re-exports temporales.
- Convencion canonica de nombres de inputs GraphQL.
- PRs incrementales con lint/typecheck por fase.
- Eliminar paths legacy solo tras confirmar sin consumidores.

---

## 8) Propuesta de PRs

1. PR-1: Estructura `core/platform` + `core/shared` + re-exports de compatibilidad.
2. PR-2: Filtros compartidos (schemas + inputs) con validacion Zod.
3. PR-3: Users consume filtros compartidos y elimina duplicados.
4. PR-4: Extraccion de mapper local en users + normalizacion final de imports.
5. PR-5: Eliminacion de shims legacy + limpieza final.

---

## 9) Decisiones a cerrar antes de implementar

1. Confirmar estrategia: mantener `core` con split interno `platform/shared` (recomendado) o renombre total a `platform` + `shared`.
2. Confirmar ruta canonica del builder:
   - `@/core/platform/graphql/pothos-builder`
   - o shortcut re-exportado desde `@/core/platform/graphql`.
3. Definir alcance del primer ciclo compartido:
   - solo filtros,
   - o filtros + factory generica para `orderBy`.
