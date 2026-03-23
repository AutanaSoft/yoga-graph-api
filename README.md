# YogaGraph API

YogaGraph API is a GraphQL backend built with GraphQL Yoga, Fastify, Pothos, and Prisma. It is designed as a modular API for building typed schemas, queries, mutations, and database-backed business logic.

## Features

- GraphQL server powered by GraphQL Yoga
- Fastify-based HTTP server
- Schema-first developer experience with Pothos
- Prisma integration for database access and generated types
- Environment validation with Zod
- Security-focused Fastify plugins for CORS, Helmet, rate limiting, and CSRF protection

## Requirements

- Node.js 20 or newer
- pnpm 10 or newer
- PostgreSQL

## Getting Started

```bash
pnpm install
```

Create a `.env` file in the project root with the required environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/yogagraph"
APP_ENV="development"
APP_PORT=4000
APP_LOG_LEVEL="info"
```

Run the development server:

```bash
pnpm run dev
```

The GraphQL endpoint will be available at:

```text
http://localhost:4000/graphql
```

## Available Scripts

- `pnpm run dev` - start the development server with hot reload
- `pnpm run lint` - run ESLint with auto-fix
- `pnpm run format` - format TypeScript sources with Prettier
- `pnpm exec tsc --noEmit` - type-check the project
- `pnpm exec prisma generate` - generate the Prisma client
- `pnpm exec prisma migrate dev` - run local database migrations

## Project Structure

- `src/index.ts` - application entry point
- `src/server.ts` - Fastify server bootstrap and plugin registration
- `src/modules/` - feature modules with resolvers, services, entities, and inputs
- `src/database/prisma/` - Prisma schema, migrations, and generated client
- `src/core/` - shared utilities, plugins, and GraphQL helpers

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
