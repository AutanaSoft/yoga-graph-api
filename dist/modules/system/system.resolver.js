import { systemService } from './system.service.js';
import { SystemStatusSchema } from './system.schema.js';
export const systemResolvers = {
    Query: {
        systemHealth: async (_parent, _args, context) => {
            const data = await systemService.getStatus();
            // Validación estricta con Zod antes de enviar respuesta al cliente
            const parsedData = SystemStatusSchema.parse(data);
            // Podemos usar el context para logger, auth, db (usamos prisma directamente en service, pero se puede inyectar)
            context.req.log.info('System Health Checked');
            return parsedData;
        },
    },
};
