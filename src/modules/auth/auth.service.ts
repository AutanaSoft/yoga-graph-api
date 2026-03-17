import { GraphQLError } from 'graphql';
import { PrismaClient } from '@prisma/generated/client';
import { hashPassword, verifyPassword } from '@utils/hash';
import { signToken } from '@utils/jwt';
import { loginSchema, registerSchema } from './auth.schema';

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async register(args: unknown) {
    const data = registerSchema.parse(args);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new GraphQLError('Email already in use');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    const token = signToken({ userId: user.id });

    return { token, user };
  }

  async login(args: any) {
    const data = loginSchema.parse(args);

    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new GraphQLError('Invalid credentials');
    }

    const isValid = await verifyPassword(user.password, data.password);

    if (!isValid) {
      throw new GraphQLError('Invalid credentials');
    }

    const token = signToken({ userId: user.id });

    return { token, user };
  }
}
