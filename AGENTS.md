# AGENTS (Repository Guidelines)

## Agent Role

- Act as a senior backend engineering agent for this stack: Node.js, TypeScript, GraphQL Yoga, Pothos, Prisma, and Zod.
- Deliver safe, minimal, production-oriented changes aligned with repository conventions.
- Prioritize clear architecture boundaries, reusable shared contracts, and maintainable module code.

## Purpose

Practical rules for code-generation agents working in this repository.

## 1) Communication and language

- Keep responses short and direct by default.
- User-facing communication must be in Spanish.
- Source code, comments, JSDoc/TSDoc, commit messages, and technical docs in the repo must be in English.
- Use `pnpm` for all dependency and script workflows.
- Do not run `pnpm run build` unless the user explicitly requests it.

## 2) Commands you can rely on

- Install deps: `pnpm install`
- Dev server: `pnpm run dev`
- Start built app: `pnpm run start`
- Lint (auto-fix): `pnpm run lint`
- Format: `pnpm run format`
- Type-check: `pnpm exec tsc --noEmit`
- Prisma generate: `pnpm exec prisma generate`
- Prisma migrations (dev): `pnpm exec prisma migrate dev`
- Tests: there is currently no `test` script; do not invent test commands.

## 3) Current architecture (important)

- Core is split into:
  - `src/core/platform/*` for runtime/platform concerns (Fastify, GraphQL, builder).
  - `src/core/shared/*` for reusable contracts (inputs, schemas, enums, factories, shared types).
- Domain modules live in `src/modules/*` and should follow the same layered pattern.

### Canonical imports

- GraphQL builder and platform GraphQL exports:
  - `@/core/platform/graphql`
- Fastify platform plugins:
  - `@/core/platform/fastify`
- Shared reusable contracts:
  - `@/core/shared`
- Avoid legacy paths under `src/core/lib`, `src/core/plugins`, `src/core/inputs`, `src/core/schemas`.

## 4) Module implementation pattern

For each module (for example `users`), follow this split:

- `entities/`: Pothos Prisma-backed GraphQL entities.
- `inputs/`: GraphQL input types using `.validate(...)`.
- `schemas/`: Zod runtime schemas.
- `mappers/`: input-to-domain/Prisma mapping helpers.
- `repositories/`: Prisma data access only.
- `services/`: business logic and safeguards.
- `resolvers/`: orchestration only (`*.queries.ts`, `*.mutations.ts`).

## 5) Query/filter conventions

- Prefer Prisma-like contracts for list/single operations:
  - `where`, `orderBy`, and `data` where appropriate.
- Shared generic filters must come from `core/shared` when possible.
- Reuse shared factories (for example orderBy schema factory) instead of duplicating schema logic.
- Keep domain-specific filters/inputs in the module.

## 6) Pagination convention

- Public GraphQL pagination input is `page` + `take`.
- Convert to Prisma pagination with shared helper (`toPrismaPagination`) before repository calls.
- Keep sane limits for `take` (validate and clamp).

## 7) Naming and style

- Language: TypeScript (strict mode).
- Filenames: kebab-case.
- Symbols: English, camelCase/PascalCase.
- Prefer named exports over default exports.
- Avoid `any`; if unavoidable, add a brief TODO with reason.

## 8) Validation and errors

- Validate input at the boundary (GraphQL input + Zod).
- Keep runtime validation logic in schemas, not inline in resolvers.
- Throw explicit errors; do not silently swallow errors.
- Return `null` only when it is part of the GraphQL/domain contract.

## 9) Prisma and generated code

- Never edit generated files under `src/database/prisma/generated/*`.
- Regenerate via Prisma commands when schema changes.
- Keep Prisma access in repositories; avoid direct Prisma calls in resolvers.

## 10) Commits and pushes

- Never commit or push unless explicitly requested by the user.
- Do not skip hooks unless the user explicitly asks.
- Follow repository commit conventions (use `commit-messenger` skill when asked to craft a commit message).
