import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { yoga } from './graphql/yoga.js';
export async function buildApp() {
    const app = fastify({
        logger: {
            transport: process.env.NODE_ENV === 'development'
                ? {
                    target: 'pino-pretty',
                    options: {
                        translateTime: 'SYS:standard',
                        ignore: 'pid,hostname',
                    },
                }
                : undefined,
        },
    });
    // Básicos de Seguridad y Entorno
    await app.register(cors, {
        origin: process.env.NODE_ENV === 'development' ? '*' : false,
        credentials: true,
    });
    await app.register(helmet, {
        contentSecurityPolicy: process.env.NODE_ENV === 'development'
            ? false // Desactivamos CSP localmente para permitir acceder libremente a GraphiQL en el navegador
            : {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", 'unpkg.com'],
                    styleSrc: ["'self'", "'unsafe-inline'", 'unpkg.com'],
                    imgSrc: ["'self'", 'data:', 'unpkg.com'],
                },
            },
    });
    await app.register(rateLimit, {
        max: process.env.NODE_ENV === 'development' ? 1000 : 100, // Umbral alto en DEV
        timeWindow: '1 minute',
    });
    // Healthcheck Básico Web
    app.get('/', async () => {
        return { status: 'ok', message: 'Fastify API Running' };
    });
    // Integración Base: Fastify & Yoga GraphQL (Desactivar body-parser para que subidas de archivos funcionen con Spec nativo Yoga)
    app.route({
        url: yoga.graphqlEndpoint,
        method: ['GET', 'POST', 'OPTIONS'],
        handler: async (req, reply) => {
            const response = await yoga.handleNodeRequestAndResponse(req, reply, {
                req,
                reply,
            });
            // Headers son adjuntados al reply directamente manejados por la especificación Web Fetch de Yoga
            response.headers.forEach((value, key) => {
                reply.header(key, value);
            });
            reply.status(response.status);
            reply.send(response.body);
            return reply;
        },
    });
    return app;
}
