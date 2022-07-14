export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT as string, 10),
  sessionStore: {
    host: process.env.SESSIONS_HOST,
    port: parseInt(process.env.SESSIONS_PORT as string, 10),
    secret: process.env.SESSIONS_SECRET,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
});
