import { Constants } from '../../common/enums/generic.enum';
import { HttpStatus } from '@nestjs/common';
import { ResponseWithData } from '../../interfaces/response';
import { validateJoiSchema } from '../../utils/joi';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../../utils/response';
import { TransferStatusRequestDto, TransferStatusResponsePayload } from '../../interfaces/disbursements/transferStatus';
import { transferStatusSchema } from '../../schema/disbursements/transferStatus';
import { getTransferStatus } from '../../helpers/disbursements/transferStatus';

/**
 * transferStatus
 * @remarks - This is used to call mtn transfer status endpoint
 *
 * @type {Object}
 * @param {TransferStatusRequestDto}- The dto for calling mtn transfer status endpoint
 * @returns  {Promise<ResponseWithData<TransferStatusResponsePayload, TransferStatusRequestDto> | void>} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function transferStatus(
  dto: TransferStatusRequestDto
): Promise<ResponseWithData<TransferStatusResponsePayload, TransferStatusRequestDto> | void> {
  // validate payload
  const joiValidationResults = validateJoiSchema(transferStatusSchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }
  try {
    // call mtn transfer status endpoint
    const transferResponse = await getTransferStatus({
      baseUrl: dto.baseUrl,
      bearerToken: dto.bearerToken,
      subscriptionKey: dto.subscriptionKey,
      targetEnvironment: dto.targetEnvironment,
      transferReferenceId: dto.transferReferenceId,
    });

    //   Return  success
    return generateSuccessResponse({
      statusCode: HttpStatus.OK,
      message: Constants.SuccessMessage,
      requestPayload: dto,
      data: transferResponse,
    });
  } catch (error) {
    return generateErrorResponse(error, dto);
  }
}
