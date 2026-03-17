---
name: config-manager
description: Guidelines for creating and modifying configuration files and environment variables in the project using Zod 4 validation. Use this skill whenever you need to add, update, or read environment configurations.
---

# Config Manager

## Overview

This skill ensures that all environment variable configurations in the project are strongly typed, centrally validated using Zod 4, and consistent across all modules.

## Architectural Pattern

To prevent runtime crashes caused by missing or misconfigured environment variables, we use a centralized validation pattern.

- All environment variables MUST be validated before use.
- The validation is handled by the generic factory function in `src/config/env-validator.ts`.
- Individual configurations (Database, App, etc.) define their schemas in independent files (e.g., `src/config/app.config.ts`, `src/config/prisma.config.ts`) and use the `validateEnv` function.

### Adding or Modifying Configurations

When the user requests to add a new environment variable or a new configuration file, follow these steps:

1. **Locate or Create the Config File:**
   If the parameter belongs to an existing domain (like `app.config.ts` or `prisma.config.ts`), add it there. Otherwise, create a new file in `src/config/` following the `[name].config.ts` naming convention.

2. **Define the Zod Schema:**
   Use Zod versions >=4.0 constraints. For example:

   ```typescript
   import { z } from 'zod';
   import { validateEnv } from './env-validator';

   const envSchema = z.object({
     NEW_FEATURE_ENABLED: z.coerce.boolean().default(false),
     NEW_FEATURE_API_KEY: z.string().min(1),
   });
   ```

3. **Export Types and Validated Output:**
   Infer the type and export the validated instance to be consumed centrally across the application:

   ```typescript
   export type FeatureConfigType = z.infer<typeof envSchema>;

   export default validateEnv<FeatureConfigType>(envSchema);
   ```

4. **Update `.env` (Local environment):**
   Add the new required environment variables to the `.env` file (or `.env.example` if applicable) so the user is aware of them.

### Important Rules for Zod 4

- **No `flatten()`:** In Zod 4, `parse.error.flatten()` is deprecated. Do not use it for error formatting. The `env-validator.ts` file already formats the issues properly by iterating over `.issues` directly.
- **Strict URLs:** If validating a URL, use `z.string().url()` (not `z.url()`).
- **Coercion:** When getting numbers or booleans from `process.env`, ALWAYS use `z.coerce.number()` or `z.coerce.boolean()` because environment variables are read as strings.

### Usage in the Application

Whenever you need an environment variable in a module, import it directly from its corresponding config factory, instead of reading `process.env`.

```typescript
// Good
import appConfig from '@/config/app.config';
console.log(`Running on port ${appConfig.APP_PORT}`);

// Bad
console.log(`Running on port ${process.env.APP_PORT}`);
```
