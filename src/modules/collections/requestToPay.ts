import { Constants } from '../../common/enums/generic.enum';
import { HttpStatus } from '@nestjs/common';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../../utils/response';
import { ResponseWithData } from '../../interfaces/response';
import { validateJoiSchema } from '../../utils/joi';
import { RequestToPayRequestDto, RequestToPayResponse } from '../../interfaces/collections/requestToPay';
import { requestToPaySchema } from '../../schema/collections/requestToPay';
import { processRequestToPay } from '../../helpers/collections/requestToPay';

/**
 * requestToPay
 * @remarks - This is used to call mtn request to pay endpoint
 *
 * @type {Object}
 * @param {RequestToPayRequestDto}- The dto for calling mtn request to pay endpoint
 * @returns  {Object} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function requestToPay(
  dto: RequestToPayRequestDto
): Promise<ResponseWithData<RequestToPayResponse, RequestToPayRequestDto> | void> {
  // validate payload
  const joiValidationResults = validateJoiSchema(requestToPaySchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }
  try {
    // call mtn request to pay endpoint
    const requestToPayResponse = await processRequestToPay({
      baseUrl: dto.baseUrl,
      bearerToken: dto.bearerToken,
      subscriptionKey: dto.subscriptionKey,
      targetEnvironment: dto.targetEnvironment,
      referenceId: dto.referenceId,
      amount: dto.amount,
      currency: dto.currency,
      payerPartyId: dto.payerPartyId,
      payerPartyIdType: dto.payerPartyIdType,
      externalId: dto.externalId,
      payeeNote: dto.payeeNote,
      payerMessage: dto.payerMessage,
      callbackUrl: dto.callbackUrl,
    });

    //   Return  success
    return generateSuccessResponse({
      statusCode: HttpStatus.ACCEPTED,
      message: Constants.SuccessMessage,
      requestPayload: dto,
      data: requestToPayResponse,
    });
  } catch (error) {
    generateErrorResponse(error, dto);
  }
}
