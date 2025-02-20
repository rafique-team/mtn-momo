import { HttpStatus } from '@nestjs/common';
import { generateSuccessResponse } from '../../../src/utils/response';
import * as joi from '../../../src/utils/joi';
import { Constants } from '../../../src/common/enums/generic.enum';
import { InitiateCreateTokenParams } from '../../../src/interfaces/auth/token';
import { initiateCreateToken } from '../../../src/helpers/token';
import { createToken } from '../../../src/modules/auth/token';
import { createTokenSchema } from '../../../src/schema/auth/token';
import { createTokenMockJson, mockResponseFromCreateToken } from '../../mocks/auth/token';

jest.mock('../../../src/helpers/token');

describe('createToken', () => {
  const validDto: InitiateCreateTokenParams = createTokenMockJson;

  const invalidDto: InitiateCreateTokenParams = {} as InitiateCreateTokenParams;

  beforeEach(() => {
    (initiateCreateToken as jest.Mock).mockResolvedValue(mockResponseFromCreateToken);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Mtn token endpoint is required';

    await expect(createToken(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createTokenSchema, invalidDto);
    expect(initiateCreateToken).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await createToken(validDto);
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createTokenSchema, validDto);
    expect(initiateCreateToken).toHaveBeenCalledWith({
      tokenEndpoint: validDto.tokenEndpoint,
      apiUserId: validDto.apiUserId,
      subscriptionKey: validDto.subscriptionKey,
      apiKey: validDto.apiKey,
    });
    expect(result).toEqual(
      generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: Constants.SuccessMessage,
        requestPayload: validDto,
        data: mockResponseFromCreateToken,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (initiateCreateToken as jest.Mock).mockRejectedValue(false);

    await expect(createToken(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createTokenSchema, validDto);
    expect(initiateCreateToken).toHaveBeenCalledWith({
      tokenEndpoint: validDto.tokenEndpoint,
      apiUserId: validDto.apiUserId,
      subscriptionKey: validDto.subscriptionKey,
      apiKey: validDto.apiKey,
    });
  });
});
