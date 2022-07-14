import * as Joi from '@hapi/joi';

export const configValidation = Joi.object({
  CLIENT_URL: Joi.required(),
  DATABASE_URL: Joi.required(),
  CLOUDINARY_CLOUD_NAME: Joi.required(),
  CLOUDINARY_API_KEY: Joi.required(),
  CLOUDINARY_API_SECRET: Joi.required(),
  SESSIONS_SECRET: Joi.required(),
  SESSIONS_HOST: Joi.required(),
  SESSIONS_PORT: Joi.number().required(),
});
