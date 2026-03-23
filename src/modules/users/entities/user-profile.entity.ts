import { builder } from '@/core/lib/pothos-builder';

builder.prismaObject('ProfileModel', {
  name: 'Profile',
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    phone: t.exposeString('phone', { nullable: true }),
    country: t.exposeString('country', { nullable: true }),
    userId: t.exposeString('userId'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
