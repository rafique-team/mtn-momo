/**
 * CreateApiKey
 * @remarks - This is the dto to create an api key
 *
 * @type {object}
 * @property baseUrl - The remote MTN Api key sandbox base url
 * @property referenceId -  A referenceId
 * @property subscriptionKey -  Product Subscription key
 */
export interface CreateApiKeyRequestDto {
  baseUrl: string;
  referenceId: string;
  apiUserReferenceId: string;
  subscriptionKey: string;
}

/**
 * InitiateCreateApiResponse
 * @remarks - This is the response from initiate create an api key
 *
 * @type {object}
 * @property {string} - statusCode -
 * @property {message} - Message
 * @property {object} -  RequestPayload
 */
export interface CreateApiKeyResponse {
  statusCode: number;
  data: CreateApiKeyResponseData;
  message: string;
  requestPayload: {
    baseUrl: string;
    referenceId: string;
    subscriptionKey: string;
    apiUserReferenceId: string;
  };
}

/**
 * CreateApiUserResponseData
 * @remarks - This is the response for createApiUser. It is noted that it returns the api key.
 *
 * @type {object}
 */
export interface CreateApiKeyResponseData {
  apikey: string;
}
