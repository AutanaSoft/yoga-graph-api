import prisma from '../../db/prisma.js';

export class SystemService {
  async getStatus() {
    // Probamos conexión instanciada a la BD
    try {
      await prisma.$queryRaw`SELECT 1`;
      return {
        status: 'OK',
        database: 'Connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'ERROR',
        database: 'Disconnected',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown Database Error',
      };
    }
  }
}

export const systemService = new SystemService();
