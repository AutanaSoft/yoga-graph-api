import { builder } from '@/schema/builder';
import { join } from 'path';
import * as fs from 'fs-extra';

builder.scalarType('File', {
  serialize: () => {
    throw new Error('File scalar can only be used as an input type');
  },
});

export const systemResolvers = builder.mutationFields((t) => ({
  uploadImage: t.field({
    type: 'String',
    args: {
      file: t.arg({ type: 'File', required: true }),
    },
    resolve: async (_parent, { file }) => {
      const f = file;
      if (!f.type.startsWith('image/')) {
        throw new Error('Only images are allowed');
      }

      const arrayBuffer = await f.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${f.name}`;

      const uploadDir = join(process.cwd(), 'uploads');
      await fs.ensureDir(uploadDir);

      const filePath = join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      return `/uploads/${fileName}`;
    },
  }),
}));

builder.subscriptionFields((t) => ({
  serverTime: t.string({
    subscribe: async function* () {
      while (true) {
        yield new Date().toISOString();
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    },
    resolve: (payload) => payload,
  }),
}));
