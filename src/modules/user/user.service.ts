import { GraphQLError } from 'graphql';
import { PrismaClient } from '../../prisma/generated/client';
import { DecodedToken } from '../../utils/jwt';
import { deleteUserSchema, updateUserSchema } from './user.schema';

export class UserService {
  constructor(
    private prisma: PrismaClient,
    private userSession: DecodedToken | null,
  ) {}

  private requireAuth() {
    if (!this.userSession) {
      throw new GraphQLError('Unauthorized');
    }
  }

  async getUsers() {
    // this.requireAuth();
    return this.prisma.user.findMany();
  }

  async getUser(id?: string, email?: string) {
    this.requireAuth();
    if (!id && !email) {
      throw new GraphQLError('Must provide id or email');
    }
    return this.prisma.user.findFirst({
      where: {
        ...(id && { id }),
        ...(email && { email }),
      },
    });
  }

  async updateUser(args: any) {
    this.requireAuth();
    const data = updateUserSchema.parse(args);
    return this.prisma.user.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
      },
    });
  }

  async deleteUser(args: any) {
    this.requireAuth();
    const { id } = deleteUserSchema.parse(args);
    await this.prisma.user.delete({
      where: { id },
    });
    return true;
  }
}
