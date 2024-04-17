import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema: ConfigModuleOptions['validationSchema'] =
  Joi.object({
    APP_PORT: Joi.number().port(),
    DB_NAME: Joi.string(),
    DB_USER: Joi.string(),
    DB_PASSWORD: Joi.string(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number().port(),
    PG_ADMIN_EMAIL: Joi.string().email(),
    PG_ADMIN_PASSWORD: Joi.string(),
  });

export const validationOptions: ConfigModuleOptions['validationOptions'] = {
  abortEarly: true,
};
