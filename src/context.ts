import { PrismaClient } from '@prisma/generated/client';
import { DecodedToken, verifyToken } from '@utils/jwt';
import { prisma } from '@utils/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export interface GraphQLContext {
  req: FastifyRequest;
  reply: FastifyReply;
  prisma: PrismaClient;
  user: DecodedToken | null;
}

export async function createContext({
  req,
  reply,
}: {
  req: FastifyRequest;
  reply: FastifyReply;
}): Promise<GraphQLContext> {
  let user: DecodedToken | null = null;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    user = verifyToken(token);
  }

  return {
    req,
    reply,
    prisma,
    user,
  };
}
