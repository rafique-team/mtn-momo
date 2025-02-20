import * as joi from 'joi';

export const requestToPayStatusSchema = joi.object({
  bearerToken: joi.string().required().label('Bearer token'),
  targetEnvironment: joi.string().required().label('Target environment'),
  baseUrl: joi.string().required().label('Base url'),
  subscriptionKey: joi.string().required().label('Product subscription key'),
  requestToPayReferenceId: joi.string().required().label('Request to pay reference id'),
});
