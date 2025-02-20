import axios from 'axios';
import { InitiateCreateTokenParams, InitiateCreateTokenResponse } from '../interfaces/auth/token';
import { convertApiKeyAndApiUserToBase64 } from '../utils/utils';

/**
 * initiateCreateToken
 * @remarks - This is used to make an axios call to MTN collections or disbursement  token
 *
 * @type {Object}
 * @param {InitiateCreateRequestToPayTokenParams} - initiate create collections token params
 * @returns  {Promise<InitiateCreateRequestToPayTokenResponse>} - This function returns initiate create collections token response
 */
export async function initiateCreateToken(params: InitiateCreateTokenParams): Promise<InitiateCreateTokenResponse> {
  const authorization = convertApiKeyAndApiUserToBase64(params.apiUserId, params.apiKey);
  // call mtn create api user endpoint
  const response = await axios.post(
    params.tokenEndpoint,
    {},
    {
      headers: {
        Authorization: `Basic ${authorization}`,
        'Ocp-Apim-Subscription-Key': params.subscriptionKey,
      },
    }
  );

  const requestToPayTokenResponse = response?.data;

  const mtnTokenResponse: InitiateCreateTokenResponse = {
    accessToken: requestToPayTokenResponse?.access_token,
    tokenType: requestToPayTokenResponse?.token_type,
    expiresIn: requestToPayTokenResponse?.expires_in,
  };

  // return response
  return mtnTokenResponse;
}
