import { ResponseWithData } from '../../interfaces/response';
import {
  InitiateValidateAccountHolderStatusRequestDto,
  ValidateAccountHolderStatusRequestDto,
  ValidateAccountHolderStatusResponsePayload,
} from '../../interfaces/account';
import { validateAccountHolderStatus } from '../account';

/**
 * validateAccountHolderStatusForDisbursements
 * @remarks - This is used to make an axios call to MTN disbursements validate endpoint
 *
 * @type {Object}
 * @param {ValidateAccountHolderStatusRequestDto} - create tokens dto
 * @returns  {Promise<ResponseWithData<ValidateAccountHolderStatusResponsePayload, InitiateValidateAccountHolderStatusRequestDto>>} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function validateAccountHolderStatusForDisbursements(
  dto: ValidateAccountHolderStatusRequestDto
): Promise<ResponseWithData<ValidateAccountHolderStatusResponsePayload, InitiateValidateAccountHolderStatusRequestDto> | void> {
  return validateAccountHolderStatus({
    accountHolderId: dto.accountHolderId,
    accountHolderIdType: dto.accountHolderIdType,
    bearerToken: dto.bearerToken,
    subscriptionKey: dto.subscriptionKey,
    targetEnvironment: dto.targetEnvironment,
    validateAccountEndpoint: `${dto.baseUrl}/disbursement/v1_0/accountholder/${dto.accountHolderIdType}/${dto.accountHolderId}/active`,
  });
}
