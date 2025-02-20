import { Constants } from '../../common/enums/generic.enum';
import { HttpStatus } from '@nestjs/common';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../../utils/response';
import { ResponseWithData } from '../../interfaces/response';
import { validateJoiSchema } from '../../utils/joi';
import { createApiUserSchema } from '../../schema/auth/apiUser';
import { initiateCreateApiUser } from '../../helpers/apiUser';
import { CreateApiUserRequestDto, CreateApiUserResponseData } from '../../interfaces/auth/apiUser';

/**
 * createApiUser
 * @remarks - This is used to create an mtn sandbox api user
 *
 * @type {Object}
 * @param {CreateApiUserRequestDto} - The dto for creating an mtn sanbox api user
 * @returns  {Object} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */

export async function createApiUser(
  dto: CreateApiUserRequestDto
): Promise<ResponseWithData<CreateApiUserResponseData, CreateApiUserRequestDto> | void> {
  // validate payload
  const joiValidationResults = validateJoiSchema(createApiUserSchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }

  try {
    // call mtn create user api
    const createUserResponse = await initiateCreateApiUser({
      baseUrl: dto.baseUrl,
      providerCallbackHost: dto.providerCallbackHost,
      referenceId: dto.referenceId,
      subscriptionKey: dto.subscriptionKey,
    });

    //   Return  success
    return generateSuccessResponse({
      statusCode: HttpStatus.CREATED,
      message: Constants.SuccessMessage,
      requestPayload: dto,
      data: createUserResponse,
    });
  } catch (error) {
    generateErrorResponse(error, dto);
  }
}
