const isDevelopment = process.env.NODE_ENV === 'development';

export const config = {
  backend: {
    url: isDevelopment ? 'http://localhost:4000/v1' : process.env.API_URL,
  },
};
