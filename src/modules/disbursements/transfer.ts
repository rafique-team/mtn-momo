import { Constants } from '../../common/enums/generic.enum';
import { HttpStatus } from '@nestjs/common';
import { generateErrorResponse, generateSuccessResponse, generateValidationErrorResponse } from '../../utils/response';
import { ResponseWithData } from '../../interfaces/response';
import { validateJoiSchema } from '../../utils/joi';
import { TransferRequestDto, TransferResponsePayload } from '../../interfaces/disbursements/transfer';
import { transferSchema } from '../../schema/disbursements/transfer';
import { processTransfer } from '../../helpers/disbursements/transfer';

/**
 * transfer
 * @remarks - This is used to call mtn transfer endpoint
 *
 * @type {Object}
 * @param {TransferRequestDto}- The dto for calling mtn transfer endpoint
 * @returns  {Object} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function transfer(dto: TransferRequestDto): Promise<ResponseWithData<TransferResponsePayload, TransferRequestDto> | void> {
  // validate payload
  const joiValidationResults = validateJoiSchema(transferSchema, dto);

  if (joiValidationResults) {
    return generateValidationErrorResponse(joiValidationResults, HttpStatus.BAD_REQUEST, dto);
  }
  try {
    // call mtn request to pay endpoint
    const transferResponse = await processTransfer({
      baseUrl: dto.baseUrl,
      bearerToken: dto.bearerToken,
      subscriptionKey: dto.subscriptionKey,
      targetEnvironment: dto.targetEnvironment,
      referenceId: dto.referenceId,
      amount: dto.amount,
      currency: dto.currency,
      payeePartyId: dto.payeePartyId,
      payeePartyIdType: dto.payeePartyIdType,
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
      data: transferResponse,
    });
  } catch (error) {
    generateErrorResponse(error, dto);
  }
}
