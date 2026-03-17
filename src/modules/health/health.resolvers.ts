export const healthResolvers = {
  Query: {
    health: () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
      };
    },
  },
};
