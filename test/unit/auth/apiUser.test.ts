import { createApiUser } from '../../../src/modules/auth/apiUser';
import { HttpStatus } from '@nestjs/common';
import { generateSuccessResponse } from '../../../src/utils/response';
import { createApiUserSchema } from '../../../src/schema//auth/apiUser';
import * as joi from '../../../src/utils/joi';
import { initiateCreateApiUser } from '../../../src/helpers/apiUser';
import { CreateApiUserRequestDto } from '../../../src/interfaces/auth/apiUser';
import { Constants } from '../../../src/common/enums/generic.enum';
import { createApiUserMockJson, mockResponseFromCreateApiUser } from '../../mocks/auth/apiUser';

jest.mock('../../../src/helpers/apiUser');

describe('createApiUser', () => {
  const validDto: CreateApiUserRequestDto = createApiUserMockJson;

  const invalidDto: CreateApiUserRequestDto = {} as CreateApiUserRequestDto;

  beforeEach(() => {
    (initiateCreateApiUser as jest.Mock).mockResolvedValue(mockResponseFromCreateApiUser);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Base url is required';

    await expect(createApiUser(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createApiUserSchema, invalidDto);
    expect(initiateCreateApiUser).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await createApiUser(validDto);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createApiUserSchema, validDto);
    expect(initiateCreateApiUser).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      providerCallbackHost: validDto.providerCallbackHost,
      referenceId: validDto.referenceId,
      subscriptionKey: validDto.subscriptionKey,
    });
    expect(result).toEqual(
      generateSuccessResponse({
        statusCode: HttpStatus.CREATED,
        message: Constants.SuccessMessage,
        requestPayload: validDto,
        data: mockResponseFromCreateApiUser,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (initiateCreateApiUser as jest.Mock).mockRejectedValue(false);

    await expect(createApiUser(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createApiUserSchema, validDto);
    expect(initiateCreateApiUser).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      providerCallbackHost: validDto.providerCallbackHost,
      referenceId: validDto.referenceId,
      subscriptionKey: validDto.subscriptionKey,
    });
  });
});
