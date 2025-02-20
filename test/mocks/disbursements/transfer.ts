import { PartyIdTypeEnum } from '../../../src/interfaces/collections/requestToPayStatus';
import { TransferRequestDto, TransferResponse, TransferResponsePayload } from '../../../src/interfaces/disbursements/transfer';

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
export const transferSuccessResponse = (payload: TransferRequestDto): TransferResponse => {
  return {
    requestPayload: { ...payload },
    statusCode: 202,
    message: 'Successfull',
    data: {},
  };
};
/**
 * Represents a mock response object for the Request to Pay endpoint with success status.
 * @typedef {Object} mockResponseFromRequestToPaySuccessStatus
 */
export const mockResponseFromTransfer: TransferResponsePayload = {};

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
 * @property {Object} payee - The payee details.
 * @property {PayerIdTypeEnum} payee.partyIdType - The party ID type.
 * @property {string} payee.partyId - The party ID.
 * @property {string} payerMessage - The payer message.
 * @property {string} payeeNote - The payee note.
 */
export const transferMockJson: TransferRequestDto = {
  subscriptionKey: 'bc35f0d89c8a406e821b7febfc3b300f',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTIxVDA4OjI2OjMwLjgxNyIsInNlc3Npb25JZCI6IjllMjk0NzQyLTljZmMtNGI3Yi1iMzllLTFiNmI4ODRkMThlMCJ9.hmfEV2VdGJp6ey4NlGU1yorDnJyU1J-K_BHboeoUM_WVjfC898HaMGop_Tl1q8GI-b0nB9PCPdKlKVlF6vojXF838ZbxzSN9M1wbp8mr1rrMWhb6CZM9eNjUCgRwTywLejpDviW8Tiu9VcYxWIjnHEYLnfL80LNaGfNduxMpcn-O_huiSRHqSGuPCPS6LbEVXvEe79vVR5DxD6GCPbj05e0t1kNAGmvL2JHT-0u9nUSkw-oyNd7LyjRyuEZzspyXCKJK_DSMRSMn5thWohcvPylOZHlHAcJG0wHVbSWSFffC_LdwXW58wfWJKcbY_YtBf3LrkZYl3WzgLepk6F2WUg',
  targetEnvironment: 'sandbox',
  referenceId: '84373ce5-9811-4663-9a37-a54df2738024',
  amount: '600',
  currency: 'EUR',
  payeePartyIdType: PartyIdTypeEnum.MSISDN,
  payeePartyId: '46733123453',
  externalId: 'test-id',
  payeeNote: 'Note',
  payerMessage: 'message',
};
