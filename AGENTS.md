AGENTS (Agent Guidelines for this repository)

Purpose

- Provide build, lint, and test commands agents should use;
- Define concise code style and conventions so automated agents produce consistent changes.

1. Agent language rules

- Always respond in Spanish when communicating with the user.
- Always present implementation plans, walkthroughs and .md files in Spanish.
- Use `pnpm` to manage project dependencies.
- Do not run the `build` command unless the user explicitly requests it.

2. Important scripts / commands

- Install dependencies (preferred package manager): `pnpm install` (this repository uses pnpm@10+)
- Start dev server (hot-reload): `pnpm run dev` (runs `tsx watch --include "src/**/*.ts" src/index.ts`)
- Build production artifacts: `pnpm run build` (runs `tsc` -> outputs `dist/`)
- Start built app: `pnpm run start` (runs `node dist/index.js`)
- Lint and auto-fix: `pnpm run lint` (runs `eslint --fix .`)
- Format with Prettier: `pnpm run format` (runs `prettier --write "src/**/*.ts"`)
- Type‑check only: `pnpm exec tsc --noEmit` (run via `pnpm exec` to use local typescript)

3. Prisma / DB

- Generate prisma client: `pnpm exec prisma generate`
- Run migrations (local/dev): `pnpm exec prisma migrate dev`

4. High-level code style & conventions

- Language: TypeScript (target ESNext / Node environment). Always keep types strict where reasonable.
- Filenames: use kebab-case for filenames (example: `create-user.dto.ts`, `users.service.ts`).
- Symbols: use English for variable/function/type names.
- Exports: prefer named exports. Use `export class` / `export function` / `export const` instead of default exports.

5. Types, interfaces and DTOs

- Prefer `type` for union/utility types and `interface` for object-shaped types used as API/DTO contracts.
- DTO files use the `*.dto.ts` suffix in `src/modules/*/dto/` — follow that pattern for new modules.
- Keep runtime validation separate from types: use Zod for runtime validation where input must be validated (`src/config/env-validator.ts` shows a pattern).
- Avoid `any`. If unavoidable, add a short TODO comment referencing reason and a follow-up task.

6. Naming conventions

- Classes and types: PascalCase (e.g., `UsersService`, `CreateUserDto`).
- Functions and variables: camelCase (e.g., `getUsers`, `emailContains`).
- Repository methods: verbs that indicate DB actions: `findById`, `findAll`, `create`, `update`, `delete`.
- GraphQL schema builder and resolvers: keep GraphQL `type`/`field` names in GraphQL-casing where appropriate but TS identifiers remain camelCase/PascalCase.

7. Error handling

- Throw typed Errors for exceptional control flow; avoid returning `null`/`undefined` to indicate failure unless explicitly part of the domain contract.
- Prefer creating small, descriptive Error subclasses or use `HttpError`-like helpers when integrating with the HTTP layer.
- Validate inputs (DTOs / Zod) at the boundary (resolver/controller) and return structured GraphQL errors or HTTP responses with proper status codes.
- When catching, always either rethrow a wrapped error (with contextual message) or handle it fully. Do not silently swallow errors.

8. GraphQL / Pothos / Prisma patterns

- GraphQL types and resolvers live under `src/modules/*` with a resolver and service/repository split.
- Keep business logic in services (`*.service.ts`), persistence in repositories (`*.repository.ts`), and orchestrate in resolvers.
- Use Pothos plugins consistently for Prisma integration (the repo has @pothos/plugin-prisma). Keep generated Pothos files under `src/database/prisma/generated` and do not hand-edit generated files.

9. Pull requests & commits

- Never create a commit or push unless explicitly requested by the user.
- Follow the `commit-messenger` skill to generate commit messages.
- Do not skip Husky hooks unless the user expressly approves.
