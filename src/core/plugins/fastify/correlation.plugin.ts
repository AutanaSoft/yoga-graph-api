import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

/**
 * Core Logic for the Correlation ID Plugin.
 *
 * Attaches a hook to the `onSend` lifecycle event which gets triggered just before
 * a response is dispatched to the client. This allows us to modify the final response headers.
 *
 * @param {FastifyInstance} server - The Fastify application instance.
 */
const correlationPluginAsync: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.addHook('onSend', async (request, reply, payload) => {
    /**
     * Injects the request ID (assigned by Fastify as our Correlation ID)
     * into the outgoing HTTP response headers. Standardizing on `x-correlation-id`
     * guarantees traceability for any downstream client or metric systems.
     */
    reply.header('x-correlation-id', request.id);
    return payload;
  });

  // Since it's a FastifyPluginAsync signature, it technically requires yielding an await.
  await Promise.resolve();
};

/**
 * A Fastify plugin that automatically injects the Correlation ID
 * into the response headers, wrapping the async function so it is globally recognized
 * by Fastify as a standard plugin layout.
 */
export const correlationPlugin = fp(correlationPluginAsync, {
  name: 'correlation-plugin',
});
