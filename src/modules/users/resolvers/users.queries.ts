import { prisma } from '@/database/prisma.service';
import { builder } from '@/core/lib/pothos-builder';
import '../entities/user.entity';
import { UserWhereInput } from '../inputs';

builder.queryFields((t) => ({
  getUser: t.prismaField({
    type: 'User',
    nullable: true,
    args: { where: t.arg({ type: UserWhereInput, required: true }) },
    resolve: async (query, parent, args) => {
      console.log(args.where);
      return await prisma.user.findFirst({
        ...query,
        where: {
          ...args.where,
        },
      });
    },
  }),
}));
