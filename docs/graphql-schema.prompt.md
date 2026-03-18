**Contexto del Sistema:**
Estamos trabajando en el módulo `users` de nuestra aplicación. Nuestra API GraphQL está construida utilizando GraphQL Yoga, Pothos (con Prisma Plugin) y Zod para la validación (a través del plugin de validación de Pothos).

Actualmente, el módulo usa una estructura de "Feature Modules", pero necesitamos refactorizarlo porque los reducidos archivos de entrada se están sobrecargando mezclando responsabilidades.

**Problemas actuales:**

1. Redundancia de Inputs: Los esquemas de Zod (DTOs) y las definiciones `builder.inputType` / abstract arg types de Pothos coexisten en el mismo lugar que los resolvers.
2. Salidas: Nuestras salidas dependen de Entidades generadas vía Pothos-Prisma (`builder.prismaObject`), lo cual es correcto pero el propósito de las carpetas puede llegar a ser confuso.
3. Bloques monolíticos: `users.resolver.ts` concentra la importación, declaración de inputs, argumentos en línea, Queries, y Mutations.

**Instrucciones para el Agente:**
Por favor, analiza la actual estructura del módulo `users` y refactorízala siguiendo estrictamente las siguientes directrices arquitectónicas:

1. **Reestructuración de los Resolvers:**
   - Elimina el archivo monolítico `users.resolver.ts`.
   - Crea una subcarpeta `resolvers/` y divide el código en archivos separados por operaciones: `queries.resolver.ts` y `mutations.resolver.ts` (si hubiese suscripciones, irían en `subscriptions.resolver.ts`).

2. **Aislamiento de Inputs y Argumentos (Pothos + Zod):**
   - Crea una carpeta `inputs/` o `args/`. Mueve aquí todas las declaraciones de entrada, por ejemplo, los `builder.inputType` (como `CreateUserInput` o `UpdateUserInput`) junto con sus validaciones Zod asociadas.
   - El objetivo es que los archivos dentro de `resolvers/` queden limpios y sólo importen estos "Input Types" ya creados y validados. No deben existir objetos puros de Zod (`z.object`) definidos "inline" dentro del resolver para consultas.

3. **Manejo de Outputs (Entities):**
   - Conserva los resultados generados desde Prisma a través de Pothos en la carpeta `entities/` (como `user.entity.ts`). Estos archivos fungen oficialmente como nuestro contrato de salida hacia GraphQL. Mantén su separación limpia de la lógica.

4. **Preservar el Core de Negocio:**
   - No debes modificar la lógica interna de `users.service.ts` ni de `users.repository.ts`. Tu trabajo es exclusivamente en la capa de transporte/exposición GraphQL.
   - Los nuevos resolvers separados deben consumir los métodos del service igual a como se realizaba antes.

5. **Integración:**
   - Asegúrate de tener o actualizar un `index.ts` principal en la raíz de `modules/users/` que se encargue de importar los nuevos resolvers (queries y mutations) así como las entities, para que el `schema/builder` de Pothos siga registrándolos sin problemas.

**Criterios de Éxito:**

- El código final debe compilar sin errores de TypeScript (`pnpm exec tsc --noEmit`).
- La configuración del `builder` de Pothos no debe romperse.
- El archivo `users.resolver.ts` original debe ser eliminado y reemplazado por la nueva estructura modularizada.
