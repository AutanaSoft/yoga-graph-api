import appConfig from '@/config/app.config';
import { buildServer } from './server';

/**
 * Bootstraps and starts the Fastify server.
 *
 * It instantiates the server via `buildServer()`, binds it to the specified
 * port and host from the application configuration, and logs the GraphQL endpoint.
 * In case of initialization or listening errors, it forcefully exits the process.
 */
const start = async () => {
  try {
    const server = await buildServer();
    await server.listen({ port: appConfig.APP_PORT, host: '0.0.0.0' });
    server.log.info(`GraphQL endpoint: http://localhost:${appConfig.APP_PORT}/graphql`);
  } catch (err) {
    console.error('Error starting server', err);
    process.exit(1);
  }
};

start().catch((err) => {
  console.error('Error starting server', err);
  process.exit(1);
});
