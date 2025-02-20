import { RequestToPayRequestDto, RequestToPayResponse } from '../../../src/interfaces/collections/requestToPay';

/**
 * Creates a success response object for request to pay endpoint
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} status - The HTTP status code (202 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data object containing access token details.
 * */
export const requestToPaySuccessResponse = (payload) => {
  return {
    requestPayload: { ...payload },
    status: 202,
    message: 'Successfull',
    data: {},
  };
};

/**
 * Represents a mock response object for  request to pay.
 * @typedef {Object} mockResponseFromProcessRequestToPay
 * @property {string} status - Status
 * @property {string} message -Message
 * @property {string} data - Data
 */
export const mockResponseFromRequestToPay: RequestToPayResponse = {
  statusCode: 202,
  message: 'Successfull',
  requestPayload: {
    subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
    baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
    bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
    targetEnvironment: 'sandbox',
    referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
    amount: '500',
    currency: 'GHS',
    payerPartyId: '46733123453',
    payerPartyIdType: 'MSISDN',
    externalId: 'external-id',
    payeeNote: 'This is a note',
    payerMessage: 'This is a message',
  },
  data: {},
};

/**
 * Represents a mock request object for transfer endpoint.
 * @typedef {Object} transferMockJson
 * @property {string} subscriptionKey - The external identifier.
 * @property {string} baseUrl - Base url.
 * @property {string} bearerToken - The bearer token
 * @property {string} targetEnvironment - Target environment eg sandbox
 * @property {string} referenceId - The transfer reference
 * @property {string} externalId - The external identifier.
 * @property {string} amount - The amount.
 * @property {string} currency - The currency.
 * @property {Object} payer - The payee details.
 * @property {PayerIdTypeEnum} payer.partyIdType - The party ID type.
 * @property {string} payer.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote - The payee note.
 */
export const requestToPayMockJson: RequestToPayRequestDto = {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
  amount: '500',
  currency: 'EUR',
  payerPartyId: '46733123453',
  payerPartyIdType: 'MSISDN',
  externalId: 'external-id',
  payeeNote: 'This is a note',
  payerMessage: 'This is a message',
};
