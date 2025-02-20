import { createApiKey } from './apiKey';
import { createApiUser } from './apiUser';
import { createCollectionToken } from './collections/token';
import { createDisbursementToken } from './disbursements/token';

const collection = {
  createToken: createCollectionToken,
};
const disbursement = {
  createToken: createDisbursementToken,
};
export { createApiKey, createApiUser, collection, disbursement };
