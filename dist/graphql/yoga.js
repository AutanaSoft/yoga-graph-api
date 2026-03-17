import { createYoga } from 'graphql-yoga';
import { schema } from './schema.js';
import prisma from '../db/prisma.js';
export const yoga = createYoga({
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
