/**
 * CreateApiUserRequestDto
 * @remarks - This is the dto to create an api user
 *
 * @type {object}
 * @property baseUrl - The remote MTN Api User sandbox base url
 * @property referenceId -  A referenceId
 * @property subscriptionKey -  Product Subscription key
 * @property providerCallbackHost - Provider callback host
 */
export interface CreateApiUserRequestDto {
  baseUrl: string;
  referenceId: string;
  subscriptionKey: string;
  providerCallbackHost?: string;
}

/**
 * CreateApiUserResponse
 * @remarks - This is the response from create api user
 *
 * @type {object}
 * @property baseUrl - The remote MTN base url
 * @property referenceId -  A referenceId
 * @property subscriptionKey -  Product Subscription key
 * @property providerCallbackHost - Provider callback host
 */
export interface CreateApiUserResponse {
  statusCode: number;
  data: CreateApiUserResponseData;
  message: string;
  requestPayload: {
    baseUrl: string;
    referenceId: string;
    subscriptionKey: string;
    providerCallbackHost?: string;
  };
}

/**
 * CreateApiUserResponse
 * @remarks - This is the response for createApiUser. It is noted that it returns an empty object.
 *
 * @type {object}
 */
export interface CreateApiUserResponseData {}
