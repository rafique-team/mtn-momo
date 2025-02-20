/**
 * CreateTokenRequestDto
 * @remarks - This is the dto to create an mtn request to pay token
 *
 * @type {object}
 * @property apiKey- Generated api key
 * @property apiUserId-  Client api user id
 * @property subscriptionKey -  Product Subscription key
 * @property baseUrl - Remote mtn base url
 */
export interface CreateTokenRequestDto {
  apiKey: string;
  apiUserId: string;
  subscriptionKey: string;
  baseUrl: string;
}

/**
 * InitiateCreateTokenParams
 * @remarks - This is the dto to create a request to pay token
 *
 * @type {object}
 * @property apiKey- Generated api key
 * @property apiUserId-  Client api user id
 * @property subscriptionKey -  Product Subscription key
 * @property tokenEndpoint - Remote mtn request to pay token endpoint
 */
export interface InitiateCreateTokenParams {
  apiKey: string;
  apiUserId: string;
  subscriptionKey: string;
  tokenEndpoint: string;
}

/**
 * CreateTokenResponse
 * @remarks - This is the response for create request to pay token.
 * @type {object}
 * @property {number} statusCode- Status code of the response
 * @property {string} message -  Message
 * @property {object} requestBody - Remote mtn request to pay token endpoint
 * @property {object} data - Remote mtn request to pay token endpoint
 */
export interface CreateTokenResponse {
  statusCode: number;
  message: string;
  requestPayload: CreateTokenRequestDto;
  data: CreateTokenResponseData;
}

/**
 * CreateTokenResponseData
 * @remarks - This is the response for create request to pay token.
 * @type {object}
 * @property accessToken- Access token to be used to request to pay endpoints
 * @property tokenType -  Type of token
 * @property tokenEndpoint - Remote mtn request to pay token endpoint
 */

export interface CreateTokenResponseData {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

/**
 * InitiateCreateTokenResponse
 * @remarks - This is the response ffrom mtn create request to pay token.
 * @type {object}
 * @property accessToken- Access token to be used to request to pay endpoints
 * @property tokenType -  Type of token
 * @property tokenEndpoint - Remote mtn request to pay token endpoint
 */
export interface InitiateCreateTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
