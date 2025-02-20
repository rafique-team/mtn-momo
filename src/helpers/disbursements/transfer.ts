import axios from 'axios';
import { TransferRequestDto, TransferResponsePayload } from 'src/interfaces/disbursements/transfer';

/**
 * processTransfer
 * @remarks - This is used to make an axios call to MTN transfer endpoint
 *
 * @type {Object}
 * @param {TransferRequestDto} - Transfer dto
 * @returns  {Promise<TransferResponsePayload>} - This function returns response from mtn transfer
 */
export async function processTransfer(params: TransferRequestDto): Promise<TransferResponsePayload> {
  // call mtn transfer endpoint
  const response = await axios.post(
    `${params.baseUrl}/disbursement/v1_0/transfer`,
    {
      amount: params.amount,
      currency: params.currency,
      externalId: params.externalId,
      payee: {
        partyIdType: params.payeePartyIdType,
        partyId: params.payeePartyId,
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

  const transferResponse = response?.data;

  // return response
  return transferResponse;
}
