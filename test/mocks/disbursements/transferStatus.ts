import { PartyIdTypeEnum, ReasonEnum, StatusEnum } from '../../../src/interfaces/collections/requestToPayStatus';
import {
  TransferStatusRequestDto,
  TransferStatusResponse,
  TransferStatusResponsePayload,
} from '../../../src/interfaces/disbursements/transferStatus';

/**
 * Creates a success response object for transfer status endpoint
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} status - The HTTP status code (202 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data object containing access token details.
 * */
export const transferStatusResponse = (
  payload: TransferStatusRequestDto,
  responsePayload: TransferStatusResponsePayload
): TransferStatusResponse => {
  return {
    requestPayload: { ...payload },
    statusCode: 200,
    message: 'Successfull',
    data: {
      externalId: responsePayload.externalId || 'test-external-Id',
      amount: responsePayload.amount || '500',
      currency: responsePayload.currency || 'EURO',
      payee: {
        partyIdType: responsePayload.payee.partyIdType || PartyIdTypeEnum.MSISDN,
        partyId: responsePayload.payee.partyId || '544413229',
      },
      payerMessage: responsePayload.payerMessage || 'This is a message',
      payeeNote: responsePayload.payeeNote || 'This is a note',
      status: responsePayload.status || StatusEnum.SUCCESSFULL,
      financialTransactionId: responsePayload.financialTransactionId || 'test-id',
    },
  };
};

/**
 * Represents a mock response object for transfer status endpoint.
 * @typedef {Object} mockResponseFromTransferFailedStatusWithPayeeNotFound
 * @typedef {Object} mockResponseFromTransferFailedStatusWithPayeeNotFound
 * @property {string} externalId - The external identifier.
 * @property {string} amount - The amount.
 * @property {string} currency - The currency.
 * @property {Object} payee - The payee details.
 * @property {PayerIdTypeEnum} payee.partyIdType - The party ID type.
 * @property {string} payee.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote- The payer note.
 * @property {string} status - The status
 * @property {string} financialTransactionId - Financial transaction id
 */
export const mockResponseFromTransferPendingStatus: TransferStatusResponsePayload = {
  externalId: 'test-external-Id',
  amount: '500',
  currency: 'EURO',
  payee: {
    partyIdType: PartyIdTypeEnum.MSISDN,
    partyId: '544413229',
  },
  payerMessage: 'This is a message',
  payeeNote: 'This is a note',
  status: StatusEnum.PENDING,
  financialTransactionId: 'test-id',
};

/**
 * Represents a mock response object for transfer status endpoint.
 * @typedef {Object} mockResponseFromTransferFailedStatusWithPayeeNotFound
 * @typedef {Object} mockResponseFromTransferFailedStatusWithPayeeNotFound
 * @property {string} externalId - The external identifier.
 * @property {string} amount - The amount.
 * @property {string} currency - The currency.
 * @property {Object} payee - The payee details.
 * @property {PayerIdTypeEnum} payee.partyIdType - The party ID type.
 * @property {string} payee.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote- The payer note.
 * @property {string} status - The status
 * @property {string} financialTransactionId - Financial transaction id
 */
export const mockResponseFromTransferFailedStatusWithPayeeNotFound: TransferStatusResponsePayload = {
  externalId: 'test-external-Id',
  amount: '500',
  currency: 'EURO',
  payee: {
    partyIdType: PartyIdTypeEnum.MSISDN,
    partyId: '544413229',
  },
  payerMessage: 'This is a message',
  payeeNote: 'This is a note',
  status: StatusEnum.FAILED,
  financialTransactionId: 'test-id',
  reason: ReasonEnum.PAYEE_NOT_FOUND,
};

/**
 * Represents a mock reqsponse object forsuccessful transfer .
 * @typedef {Object} mockResponseFromTransferSuccessStatus
 * @property {string} externalId - The external identifier.
 * @property {string} amount - The amount.
 * @property {string} currency - The currency.
 * @property {Object} payee - The payee details.
 * @property {PayerIdTypeEnum} payee.partyIdType - The party ID type.
 * @property {string} payee.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote- The payer note.
 * @property {string} status - The status
 * @property {string} financialTransactionId - Financial transaction id
 */
export const mockResponseFromTransferSuccessStatus: TransferStatusResponsePayload = {
  externalId: 'test-external-Id',
  amount: '500',
  currency: 'EURO',
  payee: {
    partyIdType: PartyIdTypeEnum.MSISDN,
    partyId: '544413229',
  },
  payerMessage: 'This is a message',
  payeeNote: 'This is a note',
  status: StatusEnum.SUCCESSFULL,
  financialTransactionId: 'test',
};

/**
 * Represents a mock request object for transfer status endpoint.
 * @typedef {Object} transferStatusMockRequestBody
 * @property {string} subscriptionKey - The external identifier.
 * @property {string} baseUrl - Base url.
 * @property {string} bearerToken - The bearer token
 * @property {string} targetEnvironment - Target environment eg sandbox
 * @property {string} transferReferenceId - The transfer reference
 */
export const transferStatusMockRequestBody: TransferStatusRequestDto = {
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTE4VDE3OjA1OjEzLjYwMiIsInNlc3Npb25JZCI6IjNhZWY5NTNjLTFmNWEtNGI2YS1hMjNjLWE1ZDcxNmFiMTg5ZSJ9.iBSMtQeTTMJC-N7xYUdOvaqu3LIArYjncsNr7us3HwrHXfYVA4CjONKVjULG-8QaPy56FO_bVyZR36dOkBjGxPlCS4P34xq62xzuqDclliiDfOnisl1fVzMjg-PFcTKTpfN2buexpW4_9irTd6EqJGCy_DzNEwvc7VMd9EV3SrlG3J3hTWBJOeVZws_QJ0kXQOERvggQLKo-nw_S42Q4GG_WsPcabcV2bL-rcpvTuvKUOLRgJ9sEkTVk926m05k6qEz6GHs0QAMzuqod8g9rPD4Jp5IzvPqWyxJjzx-BC275k0SBhLGKBXOtXH9jaApbDAPahgGZiAT-wCfYp1zOJQ',
  targetEnvironment: 'sandbox',
  transferReferenceId: 'bf63e2d5-d3be-4574-98c0-50689381155f',
};
