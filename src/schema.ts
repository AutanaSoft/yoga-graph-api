import { builder } from '@/schema/builder';

// Import all modules to populate the Pothos builder registry
import '@/modules/users/resolvers';
import '@/modules/system/system.resolver';
import '@/modules/health/health.resolver';

/**
 * The final, compiled executable GraphQL schema instance to be passed to the GraphQL Yoga execution engine.
 * Built using Pothos Code-First approach.
 */
export const schema = builder.toSchema();
