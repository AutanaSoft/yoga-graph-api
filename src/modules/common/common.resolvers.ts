import { GraphQLError } from 'graphql';
import { GraphQLContext } from '../../context';

export const commonResolvers = {
  Mutation: {
    uploadProfilePicture: async (_: any, { file }: { file: File }, context: GraphQLContext) => {
      if (!context.user) throw new GraphQLError('Unauthorized');

      if (!file) {
        throw new GraphQLError('File is required');
      }

      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        throw new GraphQLError('Invalid file type. Only JPG and PNG are allowed.');
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log('Processed file upload: ' + file.name + ' - ' + buffer.byteLength + ' bytes');
      return true;
    },
  },
  Subscription: {
    serverTime: {
      subscribe: async function* () {
        while (true) {
          await new Promise((resolve) => setTimeout(resolve, 10000));
          yield { serverTime: new Date().toISOString() };
        }
      },
    },
  },
};
