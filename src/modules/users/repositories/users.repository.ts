import type { Prisma } from '@/database/prisma/generated/client';
import { prisma } from '@/database/prisma.service';

export class UsersRepository {
  findFirst(args: Prisma.UserModelFindFirstArgs) {
    return prisma.userModel.findFirst(args);
  }

  findMany(args: Prisma.UserModelFindManyArgs) {
    return prisma.userModel.findMany(args);
  }

  create(args: Prisma.UserModelCreateArgs) {
    return prisma.userModel.create(args);
  }

  update(args: Prisma.UserModelUpdateArgs) {
    return prisma.userModel.update(args);
  }

  updateMany(args: Prisma.UserModelUpdateManyArgs) {
    return prisma.userModel.updateMany(args);
  }

  delete(args: Prisma.UserModelDeleteArgs) {
    return prisma.userModel.delete(args);
  }

  deleteMany(args: Prisma.UserModelDeleteManyArgs) {
    return prisma.userModel.deleteMany(args);
  }
}

export const usersRepository = new UsersRepository();
