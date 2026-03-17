import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import { uploadConfig } from '@/config/upload.config';

/**
 * A Fastify plugin configured to handle file uploads and serve static files.
 *
 * Registers `@fastify/static` to serve uploaded artifacts from a designated directory
 * and adds a custom content type parser to safely accept `multipart/form-data` payloads
 * without crashing Fastify.
 */
export const uploadPlugin = fp(async (server) => {
  await server.register(fastifyStatic, {
    root: uploadConfig.root,
    prefix: uploadConfig.prefix,
  });

  server.addContentTypeParser('multipart/form-data', {}, (req, payload, done) => done(null));
});
