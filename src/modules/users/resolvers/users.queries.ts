import { builder } from '@/core/lib/pothos-builder';
import { prisma } from '@/database/prisma.service';
import '../entities/user.entity';
import { userEntity } from '../entities/user.entity';
import { getUserWhereInput } from '../inputs';

builder.queryFields((t) => ({
  getUser: t.prismaField({
    type: [userEntity],
    nullable: true,
    args: {
      where: t.arg({ type: getUserWhereInput, required: true }),
    },
    resolve: (query, root, args) => {
      const { where } = args;
      return prisma.userModel.findMany({
        ...query,
        where,
      });
    },
  }),
}));
