import { CreateApiUserRequestDto, CreateApiUserResponse } from 'src/interfaces/auth/apiUser';

/**
 * createApiUserMockJson
 *
 * @property {string} apiUserEndpoint - The api user endpoint
 * @property {string} providerCallbackHost - The provider callback url
 * @property {string} referenceId - A descriptive message indicating the success.
 * @property {string} subscriptionKey - The subcsription key
 * */
export const createApiUserMockJson: CreateApiUserRequestDto = {
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  providerCallbackHost: 'unumed.com',
  referenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
};

/**
 * mockResponseFromCreateApiUser
 * Creates a success response object for create api user success response
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} status Code- The HTTP status code (200 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data from create api user endpoint
 * */
export const mockResponseFromCreateApiUser: CreateApiUserResponse = {
  statusCode: 201,
  data: null,
  message: 'Successfull',
  requestPayload: {
    baseUrl: 'https://sandbox.momodeveloper.mtn.com',
    providerCallbackHost: 'unumed.com',
    referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
    subscriptionKey: 'bc35f0d89c8a406e821b7febfc3b300f',
  },
};

/**
 * createApiUserSuccessResponse
 * Creates a success response object for create api user success response
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} status - The HTTP status code (200 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data from create api user endpoint
 * */
export const createApiUserSuccessResponse = (payload: CreateApiUserRequestDto): CreateApiUserResponse => {
  return {
    requestPayload: { ...payload },
    statusCode: 201,
    message: 'Successfull',
    data: null,
  };
};
