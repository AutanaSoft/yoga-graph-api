/**
 * Centralized utility for validating environment variables against a predefined Zod schema.
 * Ensures the application only starts when all required environment configurations are valid.
 * @module config/env-validator
 */
import 'dotenv/config';
import { z } from 'zod';

/**
 * Validates the current runtime environment variables (process.env) against the provided schema.
 * If validation fails, it formats the error messages and securely throws an error to stop execution.
 *
 * @template T - The expected type inferred from the Zod Schema.
 * @param {z.ZodType<T>} schema - A Zod schema defining rules for the required environment variables.
 * @returns {T} - The strongly typed, successfully parsed environment variables.
 * @throws {Error} - A detailed error string when environment variables are missing or misconfigured.
 */
export function validateEnv<T>(schema: z.ZodType<T>): T {
  const parse = schema.safeParse(process.env);

  if (!parse.success) {
    const errorMessages = parse.error.issues
      .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${errorMessages}`);
  }

  return parse.data;
}
