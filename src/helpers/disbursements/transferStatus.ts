import axios from 'axios';
import { TransferStatusRequestDto, TransferStatusResponsePayload } from '../../interfaces/disbursements/transferStatus';

/**
 * getTransferStatus
 * @remarks - This is used to make an axios call to MTN transfer status endpoint
 *
 * @type {Object}
 * @param {TransferStatusRequestDto} - Transfer status dto
 * @returns  {Promise<TransferStatusResponsePayload>} - This function returns response of mtn transfer status
 */
export async function getTransferStatus(params: TransferStatusRequestDto): Promise<TransferStatusResponsePayload> {
  // call mtn transfer status endpoint
  const response = await axios.get(`${params.baseUrl}//disbursement/v1_0/transfer/${params.transferReferenceId}`, {
    headers: {
      Authorization: `Bearer ${params.bearerToken}`,
      'Ocp-Apim-Subscription-Key': params.subscriptionKey,
      'X-Target-Environment': params.targetEnvironment,
    },
  });

  const requestToPayStatusResponse: TransferStatusResponsePayload = response?.data;

  // return response
  return requestToPayStatusResponse;
}
