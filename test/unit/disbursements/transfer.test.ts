import { HttpStatus } from '@nestjs/common';
import { generateSuccessResponse } from '../../../src/utils/response';
import * as joi from '../../../src/utils/joi';
import { Constants } from '../../../src/common/enums/generic.enum';
import { TransferRequestDto } from '../../../src/interfaces/disbursements/transfer';
import { mockResponseFromTransfer, transferMockJson } from '../../mocks/disbursements/transfer';
import { processTransfer } from '../../../src/helpers/disbursements/transfer';
import { transfer } from '../../../src/modules/disbursements';
import { transferSchema } from '../../../src/schema/disbursements/transfer';

jest.mock('../../../src/helpers/disbursements/transfer.ts');

describe('transfer', () => {
  const validDto: TransferRequestDto = transferMockJson;

  const invalidDto: TransferRequestDto = {} as TransferRequestDto;

  beforeEach(() => {
    (processTransfer as jest.Mock).mockResolvedValue(mockResponseFromTransfer);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Bearer token is required';

    await expect(transfer(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(transferSchema, invalidDto);
    expect(processTransfer).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await transfer(validDto);
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(transferSchema, validDto);
    expect(processTransfer).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      referenceId: validDto.referenceId,
      amount: validDto.amount,
      currency: validDto.currency,
      payeePartyId: validDto.payeePartyId,
      payeePartyIdType: validDto.payeePartyIdType,
      externalId: validDto.externalId,
      payeeNote: validDto.payeeNote,
      payerMessage: validDto.payerMessage,
      callbackUrl: validDto.callbackUrl,
    });
    expect(result).toEqual(
      generateSuccessResponse({
        statusCode: HttpStatus.ACCEPTED,
        message: Constants.SuccessMessage,
        requestPayload: validDto,
        data: mockResponseFromTransfer,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (processTransfer as jest.Mock).mockRejectedValue(false);

    await expect(transfer(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(transferSchema, validDto);
    expect(processTransfer).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      referenceId: validDto.referenceId,
      amount: validDto.amount,
      currency: validDto.currency,
      payeePartyId: validDto.payeePartyId,
      payeePartyIdType: validDto.payeePartyIdType,
      externalId: validDto.externalId,
      payeeNote: validDto.payeeNote,
      payerMessage: validDto.payerMessage,
      callbackUrl: validDto.callbackUrl,
    });
  });
});
