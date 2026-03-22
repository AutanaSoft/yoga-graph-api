import fp from 'fastify-plugin';
import { createYoga } from 'graphql-yoga';
import { pothosSchema } from '@/pothos.schema';
import { createContext } from '@/core/plugins/graphql/context';
import { corsConfig } from '@/config/cors.config';

/**
 * Registers GraphQL Yoga onto the Fastify instance.
 *
 * This plugin creates the Yoga service bound to our unified schema and context factory,
 * and attaches a custom Fastify route handler to delegate HTTP requests seamlessly
 * into the Yoga execution engine.
 */
export const graphqlPlugin = fp((server) => {
  const yoga = createYoga({
    schema: pothosSchema,
    graphqlEndpoint: '/graphql',
    context: createContext,
  });

  server.route({
    url: yoga.graphqlEndpoint,
    method: corsConfig.methods,
    handler: async (req, reply) => {
      // Delegate the incoming Node request to GraphQL Yoga
      const response = await yoga.handleNodeRequestAndResponse(req, reply.raw, {});

      // Pass through Yoga's generated response headers back into Fastify
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      // End the Fastify cycle with Yoga's payload
      reply.status(response.status);
      return response.body;
    },
  });
});
