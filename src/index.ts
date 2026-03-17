import { buildServer } from './server';
import appConfig from './config/app.config';

const start = async () => {
  try {
    const server = await buildServer();
    await server.listen({ port: appConfig.APP_PORT, host: '0.0.0.0' });
    server.log.info(`Server listening on http://localhost:${appConfig.APP_PORT}`);
    server.log.info(`GraphQL endpoint: http://localhost:${appConfig.APP_PORT}/graphql`);
  } catch (err) {
    console.error('Error starting server', err);
    process.exit(1);
  }
};

start();
