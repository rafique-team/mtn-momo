import * as joi from 'joi';

export const transferStatusSchema = joi.object({
  bearerToken: joi.string().required().label('Bearer token'),
  targetEnvironment: joi.string().required().label('Target environment'),
  baseUrl: joi.string().required().label('Base url'),
  subscriptionKey: joi.string().required().label('Product subscription key'),
  transferReferenceId: joi.string().required().label('Transfer reference id'),
});
