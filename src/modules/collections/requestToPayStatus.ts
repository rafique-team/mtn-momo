import { Constants } from '../../common/enums/generic.enum';
import { HttpStatus } from '@nestjs/common';
import { ResponseWithData } from '../../interfaces/response';
import { validateJoiSchema } from '../../utils/joi';
import { RequestToPayStatusRequestDto, RequestToPayStatusResponsePayload } from '../../interfaces/collections/requestToPayStatus';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../../utils/response';
import { getRequestToPayStatus } from '../../helpers/collections/requestToPayStatus';
import { requestToPayStatusSchema } from '../../schema/collections/requestTopayStatus';

/**
 * requestToPayStatus
 * @remarks - This is used to call mtn request to pay transaction status endpoint
 *
 * @type {Object}
 * @param {RequestToPayStatusRequestDto}- The dto for calling mtn request to pay transaction status endpoint
 * @returns  {Object} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function requestToPayStatus(
  dto: RequestToPayStatusRequestDto
): Promise<ResponseWithData<RequestToPayStatusResponsePayload, RequestToPayStatusRequestDto> | void> {
  // validate payload
  const joiValidationResults = validateJoiSchema(requestToPayStatusSchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }
  try {
    // call mtn request to pay status endpoint
    const requestToPayResponse = await getRequestToPayStatus({
      baseUrl: dto.baseUrl,
      bearerToken: dto.bearerToken,
      subscriptionKey: dto.subscriptionKey,
      targetEnvironment: dto.targetEnvironment,
      requestToPayReferenceId: dto.requestToPayReferenceId,
    });

    //   Return  success
    return generateSuccessResponse({
      statusCode: HttpStatus.OK,
      message: Constants.SuccessMessage,
      requestPayload: dto,
      data: requestToPayResponse,
    });
  } catch (error) {
    generateErrorResponse(error, dto);
  }
}
