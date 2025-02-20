import { HttpStatus } from '@nestjs/common';
import { InitiateValidateAccountHolderStatusRequestDto, ValidateAccountHolderStatusResponsePayload } from '../interfaces/account';
import { ResponseWithData } from '../interfaces/response';
import { validateAccountHolderStatusSchema } from '../schema/account';
import { validateJoiSchema } from '../utils/joi';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../utils/response';
import { getAccountHolderStatus } from '../helpers/account';
import { Constants } from '../common/enums/generic.enum';

/**
 * validateAccountHolderStatus
 * @remarks - This is used to validate an mtn account number status
 *
 * @type {Object}
 * @param {InitiateValidateAccountHolderStatusRequestDto} - The dto for validating account holder status
 * @returns  {Promise<ResponseWithData<ValidateAccountHolderStatusResponsePayload, ValidateAccountHolderStatusRequestDto> | void>} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function validateAccountHolderStatus(
  dto: InitiateValidateAccountHolderStatusRequestDto
): Promise<ResponseWithData<ValidateAccountHolderStatusResponsePayload, InitiateValidateAccountHolderStatusRequestDto> | void> {
  // validate payload

  const joiValidationResults = validateJoiSchema(validateAccountHolderStatusSchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }

  try {
    // call mtn  valiadte account holder endpoint
    const createTokenResponse = await getAccountHolderStatus({
      accountHolderId: dto.accountHolderId,
      accountHolderIdType: dto.accountHolderIdType,
      bearerToken: dto.bearerToken,
      subscriptionKey: dto.subscriptionKey,
      targetEnvironment: dto.targetEnvironment,
      validateAccountEndpoint: dto.validateAccountEndpoint,
    });

    //   Return  success
    return generateSuccessResponse({
      statusCode: HttpStatus.OK,
      message: Constants.SuccessMessage,
      requestPayload: dto,
      data: createTokenResponse,
    });
  } catch (error) {
    generateErrorResponse(error, dto);
  }
}
