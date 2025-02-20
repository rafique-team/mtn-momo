import axios from 'axios';
import { RequestToPayStatusRequestDto, RequestToPayStatusResponsePayload } from '../../interfaces/collections/requestToPayStatus';

/**
 * getRequestToPayStatus
 * @remarks - This is used to make an axios call to MTN request to pay status endpoint
 *
 * @type {Object}
 * @param {RequestToPayRequestStatusDto} - request to pay status dto
 * @returns  {Promise<RequestToPaynResponse>} - This function returns response of mtn request to pay status
 */
export async function getRequestToPayStatus(params: RequestToPayStatusRequestDto): Promise<RequestToPayStatusResponsePayload> {
  // call mtn request to pay statusendpoint
  const response = await axios.get(`${params.baseUrl}/collection/v1_0/requesttopay/${params.requestToPayReferenceId}`, {
    headers: {
      Authorization: `Bearer ${params.bearerToken}`,
      'Ocp-Apim-Subscription-Key': params.subscriptionKey,
      'X-Target-Environment': params.targetEnvironment,
    },
  });

  const requestToPayStatusResponse: RequestToPayStatusResponsePayload = response?.data;

  // return response
  return requestToPayStatusResponse;
}
