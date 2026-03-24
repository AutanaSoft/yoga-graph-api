import type { Prisma } from '@/database/prisma/generated/client';
import { usersRepository } from '../repositories';

const DEFAULT_TAKE = 20;
const MAX_TAKE = 100;

export class UsersService {
  getUser(args: Prisma.UserModelFindFirstArgs) {
    return usersRepository.findFirst(args);
  }

  getUsers(args: Prisma.UserModelFindManyArgs) {
    const take = Math.min(Math.max(args.take ?? DEFAULT_TAKE, 1), MAX_TAKE);
    return usersRepository.findMany({
      ...args,
      take,
    });
  }

  createUser(args: Prisma.UserModelCreateArgs) {
    return usersRepository.create(args);
  }

  updateUser(args: Prisma.UserModelUpdateArgs) {
    return usersRepository.update(args);
  }

  updateUsers(args: Prisma.UserModelUpdateManyArgs) {
    return usersRepository.updateMany(args);
  }

  deleteUser(args: Prisma.UserModelDeleteArgs) {
    return usersRepository.delete(args);
  }

  deleteUsers(args: Prisma.UserModelDeleteManyArgs) {
    return usersRepository.deleteMany(args);
  }
}

export const usersService = new UsersService();
