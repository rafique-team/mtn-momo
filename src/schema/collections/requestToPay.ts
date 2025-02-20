import * as joi from 'joi';

export const requestToPaySchema = joi.object({
  bearerToken: joi.string().required().label('Bearer token'),
  referenceId: joi.string().required().label('Transaction reference id'),
  targetEnvironment: joi.string().required().label('Target environment'),
  baseUrl: joi.string().required().label('Base url'),
  subscriptionKey: joi.string().required().label('Product subscription key'),
  callbackUrl: joi.string().optional().label('Callback url'),
  amount: joi.string().required().label('Transaction amount'),
  currency: joi.string().required().label('Transaction amount currency'),
  externalId: joi.string().optional().label('Transaction external id'),
  payerPartyIdType: joi.string().required().label('Payer id type'),
  payerPartyId: joi.string().required().label('Payer id'),
  payerMessage: joi.string().optional().label('Payer message'),
  payeeNote: joi.string().optional().label('Payee note'),
});
