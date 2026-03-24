import { UserModel } from '@/database/prisma/generated/client';
import { YogaInitialContext } from 'graphql-yoga';

export interface GraphQLContext extends YogaInitialContext {
  user: UserModel | null;
}

export function createContext(initialContext: YogaInitialContext): GraphQLContext {
  return {
    ...initialContext,
    user: null,
  };
}
