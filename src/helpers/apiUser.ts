import axios from 'axios';
import { CreateApiUserRequestDto, CreateApiUserResponseData } from '../interfaces/auth/apiUser';

/**
 * initiateCreateApiUser
 * @remarks - This is used to make an axios call to MTN create sandbox api user endpoint
 *
 * @type {Object}
 * @param {CreateApiUserRequestDto} - create api key request dto
 * @returns  {Object} - This function returns a response from MTN
 */
export async function initiateCreateApiUser(params: CreateApiUserRequestDto): Promise<CreateApiUserResponseData> {
  // call mtn create api user endpoint
  const response = await axios.post(
    `${params.baseUrl}/v1_0/apiuser`,
    {
      providerCallbackHost: params.providerCallbackHost,
    },
    {
      headers: {
        'X-Reference-Id': params.referenceId,
        'Ocp-Apim-Subscription-Key': params.subscriptionKey,
      },
    }
  );

  const createuserResponse: CreateApiUserResponseData = response.data;

  // return response
  return createuserResponse;
}
