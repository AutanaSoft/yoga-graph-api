import { prisma } from '@/database/prisma.service';
import { Prisma } from '@/database/prisma/generated/client';

export class UsersRepository {
  static async findAll(emailContains?: string, nameContains?: string) {
    return prisma.user.findMany({
      where: {
        ...(emailContains && { email: { contains: emailContains, mode: 'insensitive' } }),
        ...(nameContains && { name: { contains: nameContains, mode: 'insensitive' } }),
      },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  static async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
