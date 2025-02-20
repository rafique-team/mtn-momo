import axios from 'axios';
import { CreateApiKeyRequestDto, CreateApiKeyResponseData } from '../interfaces/auth/apiKey';

/**
 * initiateCreateApiKey
 * @remarks - This is used to make an axios call to MTN create sandbox api Key endpoint
 *
 * @type {Object}
 * @param {InitiateCreateApiKeyParams} - initiate create api Key params
 * @returns  {Object} - This function returns a response from MTN
 */
export async function initiateCreateApiKey(params: CreateApiKeyRequestDto): Promise<CreateApiKeyResponseData> {
  // call mtn create api Key endpoint
  const response = await axios.post(
    `${params.baseUrl}/v1_0/apiuser/${params.apiUserReferenceId}/apikey`,
    {},
    {
      headers: {
        'X-Reference-Id': params.referenceId,
        'Ocp-Apim-Subscription-Key': params.subscriptionKey,
      },
    }
  );

  const createApiKeyResponse: CreateApiKeyResponseData = response.data;

  // return response
  return createApiKeyResponse;
}
