import { builder } from '@/schema/builder';
import { z } from 'zod';
import '../entities/user.entity';
import { UsersService } from '../services/users.service';

builder.queryFields((t) => ({
  users: t.prismaField({
    type: ['User'],
    args: t.validate(
      {
        emailContains: t.arg.string({ required: false }),
        userNameContains: t.arg.string({ required: false }),
      },
      z.object({
        emailContains: z.string().optional(),
        userNameContains: z.string().optional(),
      }),
    ),
    resolve: async (query, parent, args) => {
      return UsersService.getUsers(
        args.emailContains ?? undefined,
        args.userNameContains ?? undefined,
      );
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
