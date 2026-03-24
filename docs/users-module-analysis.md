Análisis del Módulo `users`

Resumen

- Estructura modular coherente: el módulo está dividido en `entities/`, `inputs/`, `schemas/`, `resolvers/`, `repositories/` y `services/` y exportado desde `src/modules/users/index.ts`.
- Buen uso de Pothos y Prisma: las entidades GraphQL se definen con `builder.prismaObject` y las consultas usan `t.prismaField` con `prisma`.
- Validación de entrada con Zod: hay esquemas Zod completos en `schemas/` y la entrada GraphQL `GetUserWhereUniqueInput` aplica validación con `.validate(...)`.
- Inconsistencias y áreas sin implementar: los índices `repositories/index.ts` y `services/index.ts` están vacíos; hay ligeras inconsistencias en importaciones y en los modelos/schemas que pueden causar problemas (por ejemplo, `UserEntitySchema` contiene `password`).

Observaciones detalladas (archivos relevantes)

- `src/modules/users/entities/user.entity.ts`: expone campos públicos y mapea `status` a `UserStatusEnum`. Correcto, cuidado de no exponer `password` aquí (no se expone).
- `src/modules/users/entities/user-profile.entity.ts`: entidad `Profile` simple y correcta.
- `src/modules/users/inputs/user.inputs.ts`: input `GetUserWhereUniqueInput` y validación con `UserWhereUniqueInputSchema` — diseño apropiado.
- `src/modules/users/resolvers/users.queries.ts`: query `getUser` que utiliza `prisma.userModel.findFirst({ ...query, where })`. Nota: `findFirst` funciona pero si el `where` es estrictamente único es preferible `findUnique` o `findUniqueOrThrow` para reflejar intención.
- `src/modules/users/schemas/user.schemas.ts`: esquemas Zod muy completos (create/update/where). Observación: `UserEntitySchema` incluye `password` y campos de persistencia (`createdAt`, etc.); mezclar representación de DB y DTO puede ser confuso.
- `src/modules/users/enum/user.enum.ts`: mapea `UserStatus` de Prisma a un enum GraphQL. Atención: la importación de `builder` viene de `@/core/lib` aquí, mientras que en otras partes se usa `@/core/lib/pothos-builder` — inconsistencia.
- `src/modules/users/repositories/index.ts`, `src/modules/users/services/index.ts`: vacíos — falta la capa de negocio/persistencia que se menciona en las convenciones del repositorio.

Lista de mejoras (priorizadas)

- 1. Implementar la capa de `repositories/` y `services/` y mover lógica de acceso a BD fuera de resolvers (`users.queries.ts`): los resolvers deben orquestar, no contener lógica de negocio o consultas complejas.
- 2. Asegurar consistencia de imports del `builder` (usar siempre `@/core/lib/pothos-builder` o un único punto de entrada) para evitar confusión y problemas con árbol de dependencias.
- 3. Separar esquemas Zod según responsabilidades:
  - `db` (tipos que reflejan la entidad de Prisma),
  - `dto` (payloads de creación/actualización),
  - `inputs` (validador para GraphQL inputs).
    Evitar que `UserEntitySchema` contenga `password` o campos sensibles que no deban reusarse en todos los contextos.
- 4. Preferir `findUnique` cuando el `where` es estrictamente único (mejor semántica y posibilidad de índices). Si se permite varias claves únicas, normalizar qué campo se usa y mapearlo a `findUnique` con el campo correcto.
- 5. Añadir pruebas unitarias para servicios y validadores Zod; añadir tests de integración para resolvers básicos.
- 6. Añadir manejo de errores y logging estructurado (no usar console.log en resolvers). Implementar clases de error o utilidades para GraphQL errors.
- 7. Asegurar que la API GraphQL nunca exponga `password` ni datos sensibles; agregar pruebas que verifiquen la forma de la respuesta.
- 8. Documentar contratos: añadir JSDoc/TSDoc en servicios y repositorios (en inglés según convención del repo).

Arquitectura sugerida (estructura de carpetas)

- src/modules/users/
  - entities/ # tipos GraphQL (pothos) basados en Prisma
    - user.entity.ts
    - user-profile.entity.ts
    - index.ts
  - schemas/ # Zod schemas (separar db/dto/inputs)
    - db.user.schemas.ts # reflejan modelo Prisma (internal)
    - dto.user.schemas.ts # CreateUser / UpdateUser payloads
    - input.user.schemas.ts # Where/Filter inputs para GraphQL
    - index.ts
  - inputs/ # Pothos inputTypes que usan los schemas
    - user.inputs.ts
    - index.ts
  - repositories/ # acceso a Prisma, queries específicas
    - users.repository.ts # funciones: findById, findByEmail, create, update, delete
    - index.ts
  - services/ # lógica de negocio, validaciones complejas, transacciones
    - users.service.ts # depende de repositories
    - index.ts
  - resolvers/ # GraphQL resolvers (queries/mutations separados)
    - users.queries.ts
    - users.mutations.ts
    - index.ts
  - enum/ # GraphQL enums
  - docs/ # documentación específica del módulo

Mejor enfoque (práctico y recomendaciones)

- Responsabilidad única: mover todas las llamadas a `prisma` fuera de los resolvers y dentro de `repositories/`. `services/` debe orquestar validaciones y reglas de negocio (por ejemplo, verificación de unicidad, hashing de password, encolar eventos, etc.).
- Validación en el borde: usar Zod para validar y transformar entradas en los inputTypes. Mantener validadores explícitos y reutilizables (no mutar objetos originales). Preferir `.parse()` en servicios para control de errores claro.
- Seguridad: nunca incluir `password` en esquemas reutilizables que puedan mezclarse con la entidad pública; mantener `password` solo en DTOs de creación y en la capa de persistencia y eliminarlos de cualquier respuesta.
- Consistencia y convenciones: seguir las reglas de estilo del repositorio (kebab-case para archivos, nombres en inglés dentro del código). Normalizar las importaciones del `builder` y del cliente Prisma.
- Errores y observabilidad: introducir una utilidad de conversión de errores de Prisma -> GraphQL friendly errors y un logger estructurado (p.ej. pino). Reemplazar `console.log` por el logger.
- Pruebas: unit tests para `repositories` (mocks de prisma), `services` (lógica de negocio) y tests de integración ligeros para resolvers usando un servidor GraphQL en memoria.

Pasos siguientes sugeridos

1. Implementar `src/modules/users/repositories/users.repository.ts` con métodos básicos (`findById`, `findByEmail`, `findByUserName`, `create`, `update`, `delete`).
2. Implementar `src/modules/users/services/users.service.ts` que use el repository y haga hashing de contraseña, validaciones adicionales y manejo de transacciones si aplica.
3. Refactorizar `src/modules/users/resolvers/users.queries.ts` para delegar a `users.service.ts`.
4. Añadir tests y CI para el módulo.

Archivo creado:

- `docs/users-module-analysis.md` (este documento)

Si quieres, implemento el esqueleto de `repositories/users.repository.ts` y `services/users.service.ts` y actualizo el resolver para usar esas capas — dime si lo hago y si prefieres que use `findUnique` o mantengamos `findFirst` por compatibilidad con búsquedas multi-campo.
