import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const correlationPluginAsync: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.addHook('onSend', async (request, reply, payload) => {
    reply.header('x-correlation-id', request.id);
    return payload;
  });

  await Promise.resolve();
};

export const correlationPlugin = fp(correlationPluginAsync, {
  name: 'correlation-plugin',
});
