import { z } from 'zod';

export const SystemStatusSchema = z.object({
  status: z.enum(['OK', 'ERROR']),
  database: z.enum(['Connected', 'Disconnected']),
  timestamp: z.string(),
  error: z.string().optional(),
});

export type SystemStatusType = z.infer<typeof SystemStatusSchema>;

// Exportación Type Definition pura de GQL (Integrada a Yoga Core)
export const systemTypeDefs = /* GraphQL */ `
  type SystemStatus {
    status: String!
    database: String!
    timestamp: String!
    error: String
  }

  extend type Query {
    systemHealth: SystemStatus!
  }
`;
