import axios from 'axios';
import { RequestToPayRequestDto, RequestToPayResponse } from '../../interfaces/collections/requestToPay';

/**
 * processRequestToPay
 * @remarks - This is used to make an axios call to MTN request to pay endpoint
 *
 * @type {Object}
 * @param {RequestToPayParams} - request to pay params
 * @returns  {Promise<RequestToPaynResponse>} - This function returns response of mtn request to pay
 */
export async function processRequestToPay(params: RequestToPayRequestDto): Promise<RequestToPayResponse> {
  // call mtn request to pay endpoint
  const response = await axios.post(
    `${params.baseUrl}/collection/v1_0/requesttopay`,
    {
      amount: params.amount,
      currency: params.currency,
      externalId: params.externalId,
      payer: {
        partyIdType: params.payerPartyIdType,
        partyId: params.payerPartyId,
      },
      payerMessage: params.payerMessage,
      payeeNote: params.payeeNote,
    },
    {
      headers: {
        Authorization: `Bearer ${params.bearerToken}`,
        'Ocp-Apim-Subscription-Key': params.subscriptionKey,
        'X-Reference-Id': params.referenceId,
        'X-Target-Environment': params.targetEnvironment,
        'X-Callback-Url': params.callbackUrl,
      },
    }
  );

  const requestToPayResponse = response?.data;

  // return response
  return requestToPayResponse;
}
