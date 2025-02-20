import { HttpStatus } from '@nestjs/common';
import { validateJoiSchema } from '../../utils/joi';
import { ResponseWithData } from '../../interfaces/response';
import { CreateTokenResponseData, InitiateCreateTokenParams } from '../../interfaces/auth/token';
import { createTokenSchema } from '../../schema/auth/token';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../../utils/response';
import { initiateCreateToken } from '../../helpers/token';
import { Constants } from '../../common/enums/generic.enum';

/**
 * createToken
 * @remarks - This is used to create an mtn colections or disbursement token
 *
 * @type {Object}
 * @param {CreateTokenRequestDto} - The dto for creating an mtn collections or disbursement token
 * @returns  {Promise<ResponseWithData<CreateRequestToPayTokenResponseData, CreateRequestToPayTokenRequestDto> | void>} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function createToken(
  dto: InitiateCreateTokenParams
): Promise<ResponseWithData<CreateTokenResponseData, InitiateCreateTokenParams> | void> {
  // validate payload

  const joiValidationResults = validateJoiSchema(createTokenSchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }

  try {
    // call mtn  token endpoint
    const createTokenResponse = await initiateCreateToken({
      apiKey: dto.apiKey,
      apiUserId: dto.apiUserId,
      subscriptionKey: dto.subscriptionKey,
      tokenEndpoint: dto.tokenEndpoint,
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
