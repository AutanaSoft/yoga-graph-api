# Yoga Graph API

Yoga Graph API is a GraphQL backend built with Fastify, GraphQL Yoga, Pothos, Prisma, and Zod.

## Stack

- Fastify for the HTTP server
- GraphQL Yoga for GraphQL execution
- Pothos for code-first schema building
- Prisma for database access and generated types
- Zod for runtime validation

## Requirements

- Node.js 20+
- pnpm 10+
- PostgreSQL

## Quick Start

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/yogagraph"
APP_ENV="development"
APP_PORT=4000
APP_LOG_LEVEL="info"
CORS_ORIGIN="*"
UPLOAD_DIR=".uploads"
UPLOAD_ROUTE="/uploads/"
```

Start the development server:

```bash
pnpm run dev
```

GraphQL is available at:

```text
http://localhost:4000/graphql
```

## Scripts

- `pnpm run dev` - start the development server with hot reload
- `pnpm run build` - compile TypeScript to `dist/`
- `pnpm run start` - run the compiled app
- `pnpm run lint` - run ESLint with auto-fix
- `pnpm run format` - format TypeScript sources with Prettier
- `pnpm exec tsc --noEmit` - run type-check only
- `pnpm exec prisma generate` - generate Prisma client and Pothos types
- `pnpm exec prisma migrate dev` - create and apply local migrations

## Project Structure

- `src/index.ts` - application entry point
- `src/server.ts` - Fastify bootstrap and plugin registration
- `src/core/platform/` - runtime/platform concerns (GraphQL, Fastify, builder)
- `src/core/shared/` - reusable contracts (inputs, schemas, enums, factories, types)
- `src/modules/` - domain modules organized by table/feature
- `src/database/prisma/` - Prisma schema, migrations, and generated client

## Architecture Notes

- Domain modules are organized by table/feature and split into:
  - `entities/`
  - `inputs/`
  - `schemas/`
  - `mappers/`
  - `repositories/`
  - `services/`
  - `resolvers/`
- Public list queries use `page` + `take` pagination.
- Prisma-like contracts are preferred for `where`, `orderBy`, and `data`.
- Shared filters and factories live in `src/core/shared/`.
- The `profile` relation is exposed from the `User` entity; there is no dedicated profile query.

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `APP_ENV` - `development` or `production`
- `APP_PORT` - server port
- `APP_LOG_LEVEL` - logger level
- `CORS_ORIGIN` - allowed CORS origin
- `UPLOAD_DIR` - upload directory (`.uploads` by default)
- `UPLOAD_ROUTE` - public upload route (`/uploads/` by default)

## Notes

- GraphQL endpoint: `/graphql`
- `.uploads/` is ignored by git
- No dedicated test script is defined yet

## License

MIT
