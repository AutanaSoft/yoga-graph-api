import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import { createYoga } from 'graphql-yoga';
import AppConfig from './config/app.config';
import { schema } from './schema';
import { prisma } from './database/prisma.service';
import appConfig from './config/app.config';

export const buildServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: {
      transport:
        AppConfig.APP_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: { colorize: true },
            }
          : undefined,
    },
  });

  // Security Plugins Setup
  await server.register(cors, {
    origin: '*', // Adjust for production environments
  });

  await server.register(helmet, {
    contentSecurityPolicy: appConfig.APP_ENV === 'production' ? true : false,
  });

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await server.register(fastifyStatic, {
    root: join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
  });

  // Configurar Fastify para ignorar la lectura del body en uploads y pasarlo a Yoga
  server.addContentTypeParser('multipart/form-data', {}, (req, payload, done) => done(null));

  // Setup GraphQL Yoga
  const yoga = createYoga({
    schema: schema,
    graphqlEndpoint: '/graphql',
    context: (initialContext) => ({
      ...initialContext,
      prisma,
    }),
  });

  // Attach Yoga to Fastify wrapper
  server.route({
    url: yoga.graphqlEndpoint,
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      // Fastify reply requires Node.js standard response object proxying from Yoga
      const response = await yoga.handleNodeRequestAndResponse(req, reply.raw, {});
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });
      reply.status(response.status);
      return response.body; // or reply.send(response.body)
    },
  });

  // Adding basic health check
  server.get('/health', async () => {
    return { status: 'ok' };
  });

  return server;
};
