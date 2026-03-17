import { join } from 'path';
import * as fs from 'fs-extra';

export const systemResolvers = {
  Subscription: {
    serverTime: {
      subscribe: async function* () {
        while (true) {
          yield { serverTime: new Date().toISOString() };
          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      },
    },
  },
  Mutation: {
    uploadImage: async (_parent: unknown, { file }: { file: File }) => {
      // Validate File is an image (basic check)
      if (!file.type.startsWith('image/')) {
        throw new Error('Only images are allowed');
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;

      const uploadDir = join(process.cwd(), 'uploads');
      // Ensure the directory exists
      await fs.ensureDir(uploadDir);

      const filePath = join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      return `/uploads/${fileName}`;
    },
  },
};
