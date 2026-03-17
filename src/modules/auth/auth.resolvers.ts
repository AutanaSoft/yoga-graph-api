import { GraphQLContext } from '../../context';
import { AuthService } from './auth.service';

export const authResolvers = {
  Mutation: {
    register: async (_: any, args: any, context: GraphQLContext) => {
      const authService = new AuthService(context.prisma);
      return authService.register(args);
    },
    login: async (_: any, args: any, context: GraphQLContext) => {
      const authService = new AuthService(context.prisma);
      return authService.login(args);
    },
  },
};
