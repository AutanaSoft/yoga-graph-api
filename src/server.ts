import fastify, { FastifyInstance } from 'fastify';
import { fastifyLoggerOptions } from '@/config/logger.config';
import { securityPlugins } from '@/core/plugins/fastify/security.plugin';
import { uploadPlugin } from '@/core/plugins/fastify/upload.plugin';
import { graphqlPlugin } from '@/core/plugins/graphql/graphql.plugin';

export const buildServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: fastifyLoggerOptions,
  });

  // 1. Core Fastify Plugins
  await server.register(securityPlugins);
  await server.register(uploadPlugin);

  // 2. GraphQL Plugin (Yoga + Routing)
  await server.register(graphqlPlugin);

  return server;
};
