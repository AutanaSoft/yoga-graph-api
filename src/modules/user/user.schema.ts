import { z } from 'zod';

export const userTypeDefs = /* GraphQL */ `
  extend type Query {
    users: [User!]!
    user(id: ID, email: String): User
  }

  extend type Mutation {
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): Boolean!
  }
`;

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export const deleteUserSchema = z.object({
  id: z.string().uuid(),
});
