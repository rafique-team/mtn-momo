import { Constants } from '../../common/enums/generic.enum';
import { HttpStatus } from '@nestjs/common';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../../utils/response';
import { ResponseWithData } from '../../interfaces/response';
import { validateJoiSchema } from '../../utils/joi';
import { createApiKeySchema } from '../../schema/auth/apiKey';
import { initiateCreateApiKey } from '../../helpers/apiKey';
import { CreateApiKeyRequestDto, CreateApiKeyResponseData } from '../../interfaces/auth/apiKey';

/**
 * createApiKey
 * @remarks - This is used to create an mtn sandbox api key
 *
 * @type {Object}
 * @param {CreateApiKeyRequestDto}- The dto for creating an mtn sanbox api Key
 * @returns  {Object} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */

export async function createApiKey(
  dto: CreateApiKeyRequestDto
): Promise<ResponseWithData<CreateApiKeyResponseData, CreateApiKeyRequestDto> | void> {
  // validate payload
  const joiValidationResults = validateJoiSchema(createApiKeySchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }
  try {
    // call mtn create Key api
    const createKeyResponse = await initiateCreateApiKey({
      baseUrl: dto.baseUrl,
      referenceId: dto.referenceId,
      subscriptionKey: dto.subscriptionKey,
      apiUserReferenceId: dto.apiUserReferenceId,
    });

    //   Return  success
    return generateSuccessResponse({
      statusCode: HttpStatus.CREATED,
      message: Constants.SuccessMessage,
      requestPayload: dto,
      data: createKeyResponse,
    });
  } catch (error) {
    generateErrorResponse(error, dto);
  }
}
