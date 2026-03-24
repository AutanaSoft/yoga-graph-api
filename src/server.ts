import { fastifyLoggerOptions } from '@/config/logger.config';
import { correlationPlugin, securityPlugins, uploadPlugin } from '@/core/platform/fastify';
import { graphqlPlugin } from '@/core/platform/graphql';
import fastify, { FastifyInstance } from 'fastify';
import crypto from 'node:crypto';

/**
 * Core factory function to build and configure the Fastify server instance.
 *
 * It initializes Fastify with the project's standard logger, configures native
 * request correlation features, and sequentially registers all necessary plugins.
 *
 * @returns {Promise<FastifyInstance>} A promise that resolves to the configured Fastify server.
 */
export const buildServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: fastifyLoggerOptions,
    // Tell Fastify to extract the Correlation ID from this incoming header if present
    requestIdHeader: 'x-correlation-id',
    // Fallback: Generate a secure UUID v4 if no correlation header was sent
    genReqId: () => crypto.randomUUID(),
    // Tell the Pino logger to attach this ID under the key 'correlationId' instead of 'reqId'
    requestIdLogLabel: 'correlationId',
  });

  // 1. Core Fastify Plugins
  // Registers our custom plugin to append the correlation ID in the response headers
  await server.register(correlationPlugin);
  // Registers security-related plugins (CORS, Rate Limiting, Helmet, CSRF)
  await server.register(securityPlugins);
  // Extends Fastify with GraphQL Yoga support and its routing
  await server.register(uploadPlugin);

  // 2. GraphQL Plugin
  // Registers multipart/form-data support for Fastify
  await server.register(graphqlPlugin);

  return server;
};
