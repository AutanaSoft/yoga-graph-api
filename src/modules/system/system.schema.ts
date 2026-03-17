export const systemTypeDefs = /* GraphQL */ `
  scalar File

  type Subscription {
    serverTime: String!
  }

  extend type Mutation {
    uploadImage(file: File!): String!
  }
`;
