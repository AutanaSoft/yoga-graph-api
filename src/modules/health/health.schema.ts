export const healthTypeDefs = /* GraphQL */ `
  type HealthStatus {
    status: String!
    timestamp: String!
  }

  extend type Query {
    health: HealthStatus!
  }
`;
