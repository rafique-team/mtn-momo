import { requestToPay } from '../../../src/modules/collections/requestToPay';
import { HttpStatus } from '@nestjs/common';
import { generateSuccessResponse } from '../../../src/utils/response';
import * as joi from '../../../src/utils/joi';
import { RequestToPayRequestDto } from '../../../src/interfaces/collections/requestToPay';
import { Constants } from '../../../src/common/enums/generic.enum';
import { requestToPaySchema } from '../../../src/schema/collections/requestToPay';
import { mockResponseFromRequestToPay, requestToPayMockJson } from '../../mocks/collections/requestToPay';
import { processRequestToPay } from '../../../src/helpers/collections/requestToPay';

jest.mock('../../../src/helpers/collections/requestToPay');

describe('requestToPay', () => {
  const validDto: RequestToPayRequestDto = requestToPayMockJson;

  const invalidDto: RequestToPayRequestDto = {} as RequestToPayRequestDto;

  beforeEach(() => {
    (processRequestToPay as jest.Mock).mockResolvedValue(mockResponseFromRequestToPay);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Bearer token is required';

    await expect(requestToPay(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(requestToPaySchema, invalidDto);
    expect(processRequestToPay).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await requestToPay(validDto);
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(requestToPaySchema, validDto);
    expect(processRequestToPay).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      referenceId: validDto.referenceId,
      amount: validDto.amount,
      currency: validDto.currency,
      payerPartyId: validDto.payerPartyId,
      payerPartyIdType: validDto.payerPartyIdType,
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
        data: mockResponseFromRequestToPay,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (processRequestToPay as jest.Mock).mockRejectedValue(false);

    await expect(requestToPay(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(requestToPaySchema, validDto);
    expect(processRequestToPay).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      bearerToken: validDto.bearerToken,
      subscriptionKey: validDto.subscriptionKey,
      targetEnvironment: validDto.targetEnvironment,
      referenceId: validDto.referenceId,
      amount: validDto.amount,
      currency: validDto.currency,
      payerPartyId: validDto.payerPartyId,
      payerPartyIdType: validDto.payerPartyIdType,
      externalId: validDto.externalId,
      payeeNote: validDto.payeeNote,
      payerMessage: validDto.payerMessage,
      callbackUrl: validDto.callbackUrl,
    });
  });
});
