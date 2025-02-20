import {
  PartyIdTypeEnum,
  ReasonEnum,
  RequestToPayStatusRequestDto,
  RequestToPayStatusResponse,
  RequestToPayStatusResponsePayload,
  StatusEnum,
} from '../../../src/interfaces/collections/requestToPayStatus';

/**
 * Creates a success response object for request to pay status endpoint
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} status - The HTTP status code (202 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data object containing access token details.
 * */
export const requestToPayStatusSuccessResponse = (
  payload: RequestToPayStatusRequestDto,
  responsePayload: RequestToPayStatusResponsePayload
): RequestToPayStatusResponse => {
  return {
    requestPayload: { ...payload },
    statusCode: 200,
    message: 'Successfull',
    data: {
      externalId: responsePayload.externalId || 'test-external-Id',
      amount: responsePayload.amount || '500',
      currency: responsePayload.currency || 'EURO',
      payer: {
        partyIdType: responsePayload.payer.partyIdType || PartyIdTypeEnum.MSISDN,
        partyId: responsePayload.payer.partyId || '544413229',
      },
      payerMessage: responsePayload.payerMessage || 'This is a message',
      payeeNote: responsePayload.payeeNote || 'This is a note',
      status: responsePayload.status || StatusEnum.SUCCESSFULL,
      financialTransactionId: responsePayload.financialTransactionId || 'test-id',
    },
  };
};

/**
 * Represents a mock response object for the Request to Pay Status endpoint with PENDING status.
 * @typedef {Object} mockResponseFromRequestToPayPendingStatus
 * @property {string} externalId - The external identifier.
 * @property {string} amount - The amount.
 * @property {string} currency - The currency.
 * @property {Object} payer - The payer details.
 * @property {PayerIdTypeEnum} payer.partyIdType - The party ID type.
 * @property {string} payer.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote - The payee note.
 * @property {StatusEnum} status - The status (PENDING).
 * @property {string} financialTransactionId - The financial transaction ID.
 */
export const mockResponseFromRequestToPayPendingStatus: RequestToPayStatusResponsePayload = {
  externalId: 'test-external-Id',
  amount: '500',
  currency: 'EURO',
  payer: {
    partyIdType: PartyIdTypeEnum.MSISDN,
    partyId: '544413229',
  },
  payerMessage: 'This is a message',
  payeeNote: 'This is a note',
  status: StatusEnum.PENDING,
  financialTransactionId: 'test-id',
};

/**
 * Represents a mock response object for the Request to Pay Status endpoint with FAILED status.
 * @typedef {Object} MmockResponseFromRequestToPayFailedStatusWithPayerNotFound
 * @property {string} externalId - The external identifier.
 * @property {string} amount - The amount.
 * @property {string} currency - The currency.
 * @property {Object} payer - The payer details.
 * @property {PayerIdTypeEnum} payer.partyIdType - The party ID type.
 * @property {string} payer.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote - The payee note.
 * @property {StatusEnum} status - The status (FAILED).
 * @property {string} financialTransactionId - The financial transaction ID.
 * @property {string} reason - Reason for failure.
 */
export const mockResponseFromRequestToPayFailedStatusWithPayerNotFound: RequestToPayStatusResponsePayload = {
  externalId: 'test-external-Id',
  amount: '500',
  currency: 'EURO',
  payer: {
    partyIdType: PartyIdTypeEnum.MSISDN,
    partyId: '544413229',
  },
  payerMessage: 'This is a message',
  payeeNote: 'This is a note',
  status: StatusEnum.FAILED,
  financialTransactionId: 'test-id',
  reason: ReasonEnum.PAYER_NOT_FOUND,
};

/**
 * Represents a mock response object for the Request to Pay Status endpoint with SUCCESSFULL status.
 * @typedef {Object} mockResponseFromRequestToPaySuccessStatus
 * @property {string} externalId - The external identifier.
 * @property {string} amount - The amount.
 * @property {string} currency - The currency.
 * @property {Object} payer - The payer details.
 * @property {PayerIdTypeEnum} payer.partyIdType - The party ID type.
 * @property {string} payer.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote - The payee note.
 * @property {StatusEnum} status - The status (SUCCESSFU::).
 * @property {string} financialTransactionId - The financial transaction ID.
 */
export const mockResponseFromRequestToPaySuccessStatus: RequestToPayStatusResponsePayload = {
  externalId: 'test-external-Id',
  amount: '500',
  currency: 'EURO',
  payer: {
    partyIdType: PartyIdTypeEnum.MSISDN,
    partyId: '544413229',
  },
  payerMessage: 'This is a message',
  payeeNote: 'This is a note',
  status: StatusEnum.SUCCESSFULL,
  financialTransactionId: 'test',
};

/**
 * Represents a mock request object for the Request to Pay Status endpoint.
 * @typedef {Object} requestToPayStatusMockRequestBody
 * @property {string} subscriptionKey - The external identifier.
 * @property {string} baseUrl -Base url.
 * @property {string} bearerToken - The bearer token
 * @property {string} targetEnvironment - Target environment eg sandbox
 * @property {string} requestToPayReferenceId - The request to pay reference
 */
export const requestToPayStatusMockRequestBody: RequestToPayStatusRequestDto = {
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTE4VDE3OjA1OjEzLjYwMiIsInNlc3Npb25JZCI6IjNhZWY5NTNjLTFmNWEtNGI2YS1hMjNjLWE1ZDcxNmFiMTg5ZSJ9.iBSMtQeTTMJC-N7xYUdOvaqu3LIArYjncsNr7us3HwrHXfYVA4CjONKVjULG-8QaPy56FO_bVyZR36dOkBjGxPlCS4P34xq62xzuqDclliiDfOnisl1fVzMjg-PFcTKTpfN2buexpW4_9irTd6EqJGCy_DzNEwvc7VMd9EV3SrlG3J3hTWBJOeVZws_QJ0kXQOERvggQLKo-nw_S42Q4GG_WsPcabcV2bL-rcpvTuvKUOLRgJ9sEkTVk926m05k6qEz6GHs0QAMzuqod8g9rPD4Jp5IzvPqWyxJjzx-BC275k0SBhLGKBXOtXH9jaApbDAPahgGZiAT-wCfYp1zOJQ',
  targetEnvironment: 'sandbox',
  requestToPayReferenceId: 'bf63e2d5-d3be-4574-98c0-50689381155f',
};
