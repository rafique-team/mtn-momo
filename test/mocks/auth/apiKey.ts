import { CreateApiKeyRequestDto, CreateApiKeyResponse } from '../../../src/interfaces/auth/apiKey';

/**
 * createApiKeyMockJson
 *
 * @property {string} baseUrl- The remote mtn base url
 * @property {string} referenceId- The reference id for the transaction
 * @property {string} apiUserReferenceId - The api user reference id
 * @property {string}  subscriptionKey- The subscription key
 * */
export const createApiKeyMockJson: CreateApiKeyRequestDto = {
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  referenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  apiUserReferenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
};

/**
 * mockResponseFromCreateApiKey
 *
 * @property {number} statusCode- The HTTP statusCode
 * @property {object} data- The response data
 * @property {string} message- The message
 * @property {object} requestPayload- The response payload
 * */
export const mockResponseFromCreateApiKey: CreateApiKeyResponse = {
  statusCode: 201,
  data: { apikey: '5tt6yjirf67hhjhfdd' },
  message: 'Successfull',
  requestPayload: {
    baseUrl: 'https://sandbox.momodeveloper.mtn.com',
    referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
    subscriptionKey: 'bc35f0d89c8a406e821b7febfc3b300f',
    apiUserReferenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  },
};

/**
 * createApiKeySuccessResponse
 * Creates a success response object for create api key success response
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} status - The HTTP status code (200 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data from create api key endpoint
 * */
export const createApiKeySuccessResponse = (payload: CreateApiKeyRequestDto): CreateApiKeyResponse => {
  return {
    requestPayload: { ...payload },
    statusCode: 201,
    message: 'Successfull',
    data: { apikey: '5tt6yjirf67hhjhfdd' },
  };
};
