import * as joi from 'joi';

export const createApiKeySchema = joi.object({
  baseUrl: joi.string().required().label('Base url'),
  referenceId: joi.string().required().label('ReferenceId'),
  apiUserReferenceId: joi.string().required().label('ReferenceId for the api user'),
  subscriptionKey: joi.string().required().label('Product subscription key'),
});
