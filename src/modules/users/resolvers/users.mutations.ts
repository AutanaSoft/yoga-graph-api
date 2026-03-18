import { builder } from '@/schema/builder';
import { UsersService } from '../services/users.service';
import { CreateUserInput, UpdateUserInput } from '../inputs';
import '../entities/user.entity';

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      return UsersService.createUser(args.input);
    },
  }),
  updateUser: t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: UpdateUserInput, required: true }),
    },
    resolve: async (query, parent, args) => {
      return UsersService.updateUser(args.input);
    },
  }),
  deleteUser: t.prismaField({
    type: 'User',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, parent, args) => {
      return UsersService.deleteUser(String(args.id));
    },
  }),
}));
