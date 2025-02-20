import { createApiKey } from '../../../src/modules/auth/apiKey';
import { HttpStatus } from '@nestjs/common';
import { generateSuccessResponse } from '../../../src/utils/response';
import { createApiKeySchema } from '../../../src/schema/auth/apiKey';
import * as joi from '../../../src/utils/joi';
import { initiateCreateApiKey } from '../../../src/helpers/apiKey';
import { CreateApiKeyRequestDto } from '../../../src/interfaces/auth/apiKey';
import { Constants } from '../../../src/common/enums/generic.enum';
import { createApiKeyMockJson, mockResponseFromCreateApiKey } from '../../mocks/auth/apiKey';

jest.mock('../../../src/helpers/apiKey');

describe('createApiKey', () => {
  const validDto: CreateApiKeyRequestDto = createApiKeyMockJson;

  const invalidDto: CreateApiKeyRequestDto = {} as CreateApiKeyRequestDto;

  beforeEach(() => {
    (initiateCreateApiKey as jest.Mock).mockResolvedValue(mockResponseFromCreateApiKey);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Base url is required';

    await expect(createApiKey(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createApiKeySchema, invalidDto);
    expect(initiateCreateApiKey).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await createApiKey(validDto);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createApiKeySchema, validDto);
    expect(initiateCreateApiKey).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      referenceId: validDto.referenceId,
      subscriptionKey: validDto.subscriptionKey,
      apiUserReferenceId: validDto.apiUserReferenceId,
    });
    expect(result).toEqual(
      generateSuccessResponse({
        statusCode: HttpStatus.CREATED,
        message: Constants.SuccessMessage,
        requestPayload: validDto,
        data: mockResponseFromCreateApiKey,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (initiateCreateApiKey as jest.Mock).mockRejectedValue(false);

    await expect(createApiKey(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(createApiKeySchema, validDto);
    expect(initiateCreateApiKey).toHaveBeenCalledWith({
      baseUrl: validDto.baseUrl,
      referenceId: validDto.referenceId,
      subscriptionKey: validDto.subscriptionKey,
      apiUserReferenceId: validDto.apiUserReferenceId,
    });
  });
});
