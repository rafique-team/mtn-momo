import { HttpStatus } from '@nestjs/common';
import { generateSuccessResponse } from '../../../src/utils/response';
import * as joi from '../../../src/utils/joi';
import { Constants } from '../../../src/common/enums/generic.enum';
import {
  ReasonEnum,
  RequestToPayStatusRequestDto,
  RequestToPayStatusResponsePayload,
  StatusEnum,
} from '../../../src/interfaces/collections/requestToPayStatus';
import {
  mockResponseFromRequestToPayFailedStatusWithPayerNotFound,
  requestToPayStatusMockRequestBody,
} from '../../mocks/collections/requestToPayStatus';
import { requestToPayStatus } from '../../../src/modules/collections';
import { getRequestToPayStatus } from '../../../src/helpers/collections/requestToPayStatus';
import { requestToPayStatusSchema } from '../../../src/schema/collections/requestTopayStatus';
import { ResponseWithData } from '../../../src/interfaces/response';

jest.mock('../../../src/helpers/collections/requestToPayStatus');

describe('requestToPayStatus', () => {
  const validDto: RequestToPayStatusRequestDto = requestToPayStatusMockRequestBody;

  const invalidDto: RequestToPayStatusRequestDto = {} as RequestToPayStatusRequestDto;

  beforeEach(() => {
    (getRequestToPayStatus as jest.Mock).mockResolvedValue(mockResponseFromRequestToPayFailedStatusWithPayerNotFound);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Bearer token is required';

    await expect(requestToPayStatus(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(requestToPayStatusSchema, invalidDto);
    expect(getRequestToPayStatus).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await requestToPayStatus(validDto);
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(requestToPayStatusSchema, validDto);
    expect(getRequestToPayStatus).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      requestToPayReferenceId: validDto.requestToPayReferenceId,
    });
    expect(result).toEqual(
      generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: Constants.SuccessMessage,
        requestPayload: validDto,
        data: mockResponseFromRequestToPayFailedStatusWithPayerNotFound,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (getRequestToPayStatus as jest.Mock).mockRejectedValue(false);

    await expect(requestToPayStatus(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(requestToPayStatusSchema, validDto);
    expect(getRequestToPayStatus).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      requestToPayReferenceId: validDto.requestToPayReferenceId,
    });
  });

  it('should return payer not found', async () => {
    (getRequestToPayStatus as jest.Mock).mockResolvedValue(mockResponseFromRequestToPayFailedStatusWithPayerNotFound);

    const result = (await requestToPayStatus(validDto)) as ResponseWithData<
      RequestToPayStatusResponsePayload,
      RequestToPayStatusRequestDto
    >;

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(requestToPayStatusSchema, validDto);
    expect(result?.data?.status).toEqual(StatusEnum.FAILED);
    expect(result?.data?.reason).toEqual(ReasonEnum.PAYER_NOT_FOUND);
  });
});
