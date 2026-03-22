import { builder } from '@/core/lib/pothos-builder';

const HealthStatus = builder
  .objectRef<{ status: string; timestamp: string }>('HealthStatus')
  .implement({
    fields: (t) => ({
      status: t.exposeString('status'),
      timestamp: t.exposeString('timestamp'),
    }),
  });

builder.queryFields((t) => ({
  health: t.field({
    type: HealthStatus,
    resolve: () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
    }),
  }),
}));
