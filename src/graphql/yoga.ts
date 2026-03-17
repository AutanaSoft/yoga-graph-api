import { createYoga } from 'graphql-yoga';
import { FastifyReply, FastifyRequest } from 'fastify';
import { schema } from './schema.js';
import prisma from '../db/prisma.js';
import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  req: FastifyRequest;
  reply: FastifyReply;
  prisma: PrismaClient;
}

export const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  schema,
  logging: 'debug',
  // Integración recomendada para Fastify usando Yoga API
  graphqlEndpoint: '/graphql',
  context: (initialContext) => {
    return {
      req: initialContext.req,
      reply: initialContext.reply,
      prisma,
    };
  },
});
