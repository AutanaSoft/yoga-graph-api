import { GraphQLContext } from '../../context';
import { UserService } from './user.service';

export const userResolvers = {
  Query: {
    users: async (_: any, __: any, context: GraphQLContext) => {
      const userService = new UserService(context.prisma, context.user);
      return userService.getUsers();
    },
    user: async (_: any, args: any, context: GraphQLContext) => {
      const userService = new UserService(context.prisma, context.user);
      return userService.getUser(args.id, args.email);
    },
  },
  Mutation: {
    updateUser: async (_: any, args: any, context: GraphQLContext) => {
      const userService = new UserService(context.prisma, context.user);
      return userService.updateUser(args);
    },
    deleteUser: async (_: any, args: any, context: GraphQLContext) => {
      const userService = new UserService(context.prisma, context.user);
      return userService.deleteUser(args);
    },
  },
};
