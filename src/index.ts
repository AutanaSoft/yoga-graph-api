import { buildServer } from './server';
import { env } from './config/env';

const start = async () => {
  try {
    const server = await buildServer();
    await server.listen({ port: env.PORT, host: '0.0.0.0' });
    server.log.info(`Server listening on http://localhost:${env.PORT}`);
    server.log.info(`GraphQL endpoint: http://localhost:${env.PORT}/graphql`);
  } catch (err) {
    console.error('Error starting server', err);
    process.exit(1);
  }
};

start();
