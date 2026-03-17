export const commonTypeDefs = /* GraphQL */ `
  scalar File

  extend type Mutation {
    uploadProfilePicture(file: File!): Boolean!
  }

  type Subscription {
    serverTime: String!
  }
`;
