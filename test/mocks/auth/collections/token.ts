import { CreateTokenRequestDto, CreateTokenResponse, CreateTokenResponseData } from '../../../../src/interfaces/auth/token';

/**
 * Creates a success response object for create collection token success response
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} statusCode - The HTTP status code (200 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data object containing access token details.
 * @property {string} data.accessToken - The generated access token.
 * @property {string} data.tokenType - The type of token (e.g., 'Bearer').
 * @property {number} data.expiresIn - The expiration time of the access token in seconds.
 * */
export const createCollectionTokenSuccessResponse = (payload: CreateTokenRequestDto): CreateTokenResponse => {
  return {
    requestPayload: { ...payload },
    statusCode: 200,
    message: 'Successfull',
    data: {
      accessToken: 'test-token',
      tokenType: 'Bearer',
      expiresIn: 300,
    },
  };
};

/**
 * Mock response from create collection token
 *
 * @property {string} accessToken - The generated access token.
 * @property {string} tokenType - The type of token (e.g., 'Bearer').
 * @property {number} expiresIn - The expiration time of the access token in seconds.
 * */
export const mockResponseFromCreateCollectionToken: CreateTokenResponseData = {
  accessToken: 'rtyyyiiiyiyuyuyyuyuy',
  tokenType: 'Bearer',
  expiresIn: 300,
};

/**
 * Mock request body for create disburement token
 *
 * @property {string} apiKey - The  api key
 * @property {string} apiUserId - The api user id
 * @property {number} subscriptionKey - The subscription key
 * @property {number} baseUel - The mtn base url
 * */
export const createCollectionTokenMockJson = {
  apiKey: 'bc35f0d89c8a406e821b7febfc3b300f',
  apiUserId: '9ff96246-f861-459f-a8ec-47d200427003',
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
};
