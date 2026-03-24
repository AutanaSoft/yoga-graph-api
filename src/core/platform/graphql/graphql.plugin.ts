import { corsConfig } from '@/config/cors.config';
import { pothosSchema } from '@/pothos.schema';
import fp from 'fastify-plugin';
import { createYoga } from 'graphql-yoga';
import { createContext } from './context';

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
      const response = await yoga.handleNodeRequestAndResponse(req, reply.raw, {});

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);
      return response.body;
    },
  });
});
