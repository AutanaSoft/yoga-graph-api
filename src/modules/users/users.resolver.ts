import { builder } from '@/schema/builder';
import { UsersService } from './users.service';
import { CreateUserSchema } from './dto/create-user.dto';
import { UpdateUserSchema } from './dto/update-user.dto';
import './entities/user.entity';
import { z } from 'zod';

export const CreateUserInput = builder
  .inputType('CreateUserInput', {
    fields: (t) => ({
      email: t.string({ required: true }),
      name: t.string({ required: false }),
    }),
  })
  .validate(CreateUserSchema);

export const UpdateUserInput = builder
  .inputType('UpdateUserInput', {
    fields: (t) => ({
      id: t.string({ required: true }),
      name: t.string({ required: false }),
    }),
  })
  .validate(UpdateUserSchema);

builder.queryFields((t) => ({
  users: t.prismaField({
    type: ['User'],
    args: t.validate(
      {
        emailContains: t.arg.string({ required: false }),
        nameContains: t.arg.string({ required: false }),
      },
      z.object({
        emailContains: z.string().optional(),
        nameContains: z.string().optional(),
      }),
    ),
    resolve: async (query, parent, args) => {
      return UsersService.getUsers(args.emailContains ?? undefined, args.nameContains ?? undefined);
    },
  }),
  user: t.prismaField({
    type: 'User',
    nullable: true,
    args: t.validate(
      {
        id: t.arg.string({ required: false }),
        email: t.arg.string({ required: false }),
      },
      z
        .object({
          id: z.string().optional(),
          email: z.string().email('Debe ser un correo válido').optional(),
        })
        .refine((args) => !!args.id || !!args.email, {
          message: 'Debes buscar al usuario ya sea por ID o por Correo',
        }),
    ),
    resolve: async (query, parent, args) => {
      if (args.id) return UsersService.getUserById(args.id);
      if (args.email) return UsersService.getUserByEmail(args.email);
      return null;
    },
  }),
}));

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
