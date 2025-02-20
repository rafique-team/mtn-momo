import * as joi from 'joi';
import { AccountHolderIdTypeEnum } from '../interfaces/account';

export const validateAccountHolderStatusSchema = joi.object({
  bearerToken: joi.string().required().label('Bearer token'),
  targetEnvironment: joi.string().required().label('Target environment'),
  subscriptionKey: joi.string().required().label('Product subscription key'),
  validateAccountEndpoint: joi.string().required().label('Validate account endpoint'),
  accountHolderId: joi.string().required().label('Account holder id'),
  accountHolderIdType: joi
    .string()
    .required()
    .valid(...Object.values(AccountHolderIdTypeEnum))
    .label('Account holder id type'),
});
