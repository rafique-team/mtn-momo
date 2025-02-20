import * as joi from 'joi';

export const createTokenSchema = joi.object({
  tokenEndpoint: joi.string().required().label('Mtn token endpoint'),
  apiUserId: joi.string().required().label('Api user id'),
  subscriptionKey: joi.string().required().label('Product subscription key'),
  apiKey: joi.string().required().label('Api Key'),
});
