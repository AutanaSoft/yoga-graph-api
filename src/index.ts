import { env } from '@config/env';
import Fastify from 'fastify';
import { createYoga } from 'graphql-yoga';
import { randomUUID } from 'node:crypto';
import { createContext } from './context';
import { schema } from './schema';

const app = Fastify({
  genReqId: (req) => {
    const id = req.headers['x-request-id'];
    if (id) {
      return id as string;
    }
    return randomUUID();
  },
  logger: true && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: true,
        levelFirst: false,
        translateTime: 'SYS:HH:MM:ss',
        ignore: 'hostname,pid',
        messageFormat: '{msg}',
      },
    },
    level: 'debug',
  },
});

const yoga = createYoga({
  schema,
  graphiql: true,
  context: createContext,
  logging: {
    debug: (...args) => {
      for (const arg of args) app.log.debug(arg);
    },
    info: (...args) => {
      for (const arg of args) app.log.info(arg);
    },
    warn: (...args) => {
      for (const arg of args) app.log.warn(arg);
    },
    error: (...args) => {
      for (const arg of args) app.log.error(arg);
    },
  },
});

// Fastify integration with Yoga
app.route({
  url: yoga.graphqlEndpoint,
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequestAndResponse(req, reply, {
      req,
      reply,
    });
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });
    reply.status(response.status);
    reply.send(response.body);
    return reply;
  },
});

app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}/graphql`);
});
