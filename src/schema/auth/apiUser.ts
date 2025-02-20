import * as joi from 'joi';

export const createApiUserSchema = joi.object({
  baseUrl: joi.string().required().label('Base url'),
  referenceId: joi.string().required().label('ReferenceId'),
  subscriptionKey: joi.string().required().label('Product subscription key'),
  providerCallbackHost: joi.string().optional().label('Provider Callback Host'),
});
