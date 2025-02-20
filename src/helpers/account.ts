import axios from 'axios';
import { InitiateValidateAccountHolderStatusRequestDto, ValidateAccountHolderStatusResponsePayload } from '../interfaces/account';

/**
 * getAccountHolderStatus
 * @remarks - This is used to make an axios call to MTN collections or disbursement  validate account holder status
 *
 * @type {Object}
 * @param {InitiateValidateAccountHolderStatusRequestDto} - validate account holder status request dto
 * @returns  {Promise<ValidateAccountHolderStatusResponsePayload>} - This function returns initiate create collections token response
 */
export async function getAccountHolderStatus(
  params: InitiateValidateAccountHolderStatusRequestDto
): Promise<ValidateAccountHolderStatusResponsePayload> {
  // call mtn valiadte account holder status endpoint
  const response = await axios.get(params.validateAccountEndpoint, {
    headers: {
      Authorization: `Bearer ${params.bearerToken}`,
      'Ocp-Apim-Subscription-Key': params.subscriptionKey,
      'X-Target-Environment': params.targetEnvironment,
    },
  });

  const validateAccountHolderStatusResponse: ValidateAccountHolderStatusResponsePayload = response?.data;

  // return response
  return validateAccountHolderStatusResponse;
}
