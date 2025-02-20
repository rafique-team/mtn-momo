import { HttpStatus } from '@nestjs/common';
import { generateSuccessResponse } from '../../../src/utils/response';
import * as joi from '../../../src/utils/joi';
import { Constants } from '../../../src/common/enums/generic.enum';
import { ResponseWithData } from '../../../src/interfaces/response';
import { TransferStatusRequestDto, TransferStatusResponsePayload } from '../../../src/interfaces/disbursements/transferStatus';
import {
  mockResponseFromTransferFailedStatusWithPayeeNotFound,
  mockResponseFromTransferSuccessStatus,
  transferStatusMockRequestBody,
} from '../../mocks/disbursements/transferStatus';
import { getTransferStatus } from '../../../src/helpers/disbursements/transferStatus';
import { transferStatus } from '../../../src/modules/disbursements';
import { transferStatusSchema } from '../../../src/schema/disbursements/transferStatus';
import { ReasonEnum, StatusEnum } from '../../../src/interfaces/collections/requestToPayStatus';

jest.mock('../../../src/helpers/disbursements/transferStatus.ts');

describe('transferStatus', () => {
  const validDto: TransferStatusRequestDto = transferStatusMockRequestBody;

  const invalidDto: TransferStatusRequestDto = {} as TransferStatusRequestDto;

  beforeEach(() => {
    (getTransferStatus as jest.Mock).mockResolvedValue(mockResponseFromTransferSuccessStatus);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Bearer token is required';

    await expect(transferStatus(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(transferStatusSchema, invalidDto);
    expect(getTransferStatus).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await transferStatus(validDto);
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(transferStatusSchema, validDto);
    expect(getTransferStatus).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      transferReferenceId: validDto.transferReferenceId,
    });
    expect(result).toEqual(
      generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: Constants.SuccessMessage,
        requestPayload: validDto,
        data: mockResponseFromTransferSuccessStatus,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (getTransferStatus as jest.Mock).mockRejectedValue(false);

    await expect(transferStatus(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(transferStatusSchema, validDto);
    expect(getTransferStatus).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      transferReferenceId: validDto.transferReferenceId,
    });
  });

  it('should return payee not found', async () => {
    (getTransferStatus as jest.Mock).mockResolvedValue(mockResponseFromTransferFailedStatusWithPayeeNotFound);

    const result = (await transferStatus(validDto)) as ResponseWithData<TransferStatusResponsePayload, TransferStatusRequestDto>;

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(transferStatusSchema, validDto);
    expect(result?.data?.status).toEqual(StatusEnum.FAILED);
    expect(result?.data?.reason).toEqual(ReasonEnum.PAYEE_NOT_FOUND);
  });
});
