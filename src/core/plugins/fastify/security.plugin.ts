import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { corsConfig } from '@/config/cors.config';
import { helmetConfig } from '@/config/helmet.config';
import { rateLimitConfig } from '@/config/rate-limit.config';

export const securityPlugins = fp(async (server) => {
  await server.register(cors, corsConfig);
  await server.register(helmet, helmetConfig);
  await server.register(rateLimit, rateLimitConfig);
});
