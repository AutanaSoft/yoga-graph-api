import { builder, UserStatusEnum } from '@/core/lib/pothos-builder';

builder.prismaObject('UserModel', {
  fields: (t) => ({
    id: t.exposeID('id'),
    status: t.field({
      type: UserStatusEnum,
      resolve: (user) => user.status,
    }),
    roles: t.expose('roles', { type: ['String'] }),
    email: t.exposeString('email'),
    userName: t.exposeString('userName', { nullable: true }),
    verifiedAt: t.expose('verifiedAt', { type: 'DateTime', nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
