import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import { uploadConfig } from '@/config/upload.config';

export const uploadPlugin = fp(async (server) => {
  await server.register(fastifyStatic, {
    root: uploadConfig.root,
    prefix: uploadConfig.prefix,
  });

  server.addContentTypeParser('multipart/form-data', {}, (req, payload, done) => done(null));
});
