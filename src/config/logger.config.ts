/**
 * Application Logger Configuration Module.
 * Establishes the centralized logging mechanisms for the API using Pino.
 * Controls output formats based on the operational environment (e.g. pretty printing).
 * @module config/logger.config
 */
import { PinoLoggerOptions } from 'fastify/types/logger';
import appConfig from './app.config';

/**
 * The configuration object exported for Fastify's native logger options.
 * Defines the lowest verbosity required and injects formatting transports in development.
 */
export const fastifyLoggerOptions: PinoLoggerOptions | boolean = {
  level: appConfig.APP_ENV === 'development' ? 'debug' : appConfig.APP_LOG_LEVEL,
  transport:
    appConfig.APP_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: false,
            translateTime: 'SYS:HH:MM:ss',
            ignore: 'hostname,pid',
            messageFormat: '[{context}] {msg}',
          },
        }
      : undefined,
};
