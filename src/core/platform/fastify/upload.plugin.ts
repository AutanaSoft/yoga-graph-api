import { uploadConfig } from '@/config/upload.config';
import fastifyStatic from '@fastify/static';
import fp from 'fastify-plugin';

export const uploadPlugin = fp(async (server) => {
  await server.register(fastifyStatic, {
    root: uploadConfig.root,
    prefix: uploadConfig.prefix,
  });

  server.addContentTypeParser('multipart/form-data', {}, (_request, _payload, done) => done(null));
});
