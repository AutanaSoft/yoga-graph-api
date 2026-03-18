import { builder } from '@/schema/builder';

export const UserProfileEntity = builder.prismaObject('UserProfile', {
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    phone: t.exposeString('phone', { nullable: true }),
    country: t.exposeString('country', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
