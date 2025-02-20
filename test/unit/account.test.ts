import { HttpStatus } from '@nestjs/common';
import * as joi from '../../src/utils/joi';
import {
  AccountHolderIdTypeEnum,
  InitiateValidateAccountHolderStatusRequestDto,
  ValidateAccountHolderStatusResponsePayload,
} from '../../src/interfaces/account';
import {
  validateDisbursementAccountHolderStatusMockJson,
  mockResponseFromValidateDisbursementAccountHolderStatus,
  mockResponseFromDisbursementValidateAccountHolderWithAccountNotActive,
} from '../mocks/disbursements/account';
import { getAccountHolderStatus } from '../../src/helpers/account';
import { validateAccountHolderStatus } from '../../src/modules/account';
import { validateAccountHolderStatusSchema } from '../../src/schema/account';
import { generateSuccessResponse } from '../../src/utils/response';
import { Constants } from '../../src/common/enums/generic.enum';
import { ResponseWithData } from '../../src/interfaces/response';

jest.mock('../../src/helpers/account.ts');

describe('validateAccountHolderStatus', () => {
  const validDto: InitiateValidateAccountHolderStatusRequestDto = validateDisbursementAccountHolderStatusMockJson;

  const invalidDto: InitiateValidateAccountHolderStatusRequestDto = {} as InitiateValidateAccountHolderStatusRequestDto;

  beforeEach(() => {
    (getAccountHolderStatus as jest.Mock).mockResolvedValue(mockResponseFromValidateDisbursementAccountHolderStatus);
    jest.spyOn(joi, 'validateJoiSchema');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation error for invalid payload', async () => {
    const invalidDtoMessage = 'Bearer token is required';

    await expect(validateAccountHolderStatus(invalidDto)).rejects.toThrow(invalidDtoMessage);

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(validateAccountHolderStatusSchema, invalidDto);
    expect(getAccountHolderStatus).not.toHaveBeenCalled();
  });

  it('should return success response for valid payload', async () => {
    const result = await validateAccountHolderStatus(validDto);
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(validateAccountHolderStatusSchema, validDto);
    expect(getAccountHolderStatus).toHaveBeenCalledWith({
      validateAccountEndpoint: 'https://sandbox.momodeveloper.mtn.com',
      accountHolderId: '46733123451',
      accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
      bearerToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTI2VDE1OjMxOjU4LjMyMiIsInNlc3Npb25JZCI6ImMzNWE5ODJlLTg0NTQtNGVjNi05YmRmLTRlYmJhNDQzODA2YSJ9.GGoRBhCiZARzmj2Zh4lxtLqEl-ygnRoGYRUv04pGBFvliZrsSKlY_B8vSEnADrYgDkYjabXdWWwyF553NNiKAaArazNHg6iCAgTYPMazwDmUPkPm1at4KfKPIxC5AJCeF79R491SR2niPF4iLvAXbL2h7ulRcuns2dFi4pQWbfOlxwtgQhiTOM6B-tp-_mYAptHImDjfpdIt2rasWuJh6z_5M0ZpnSC6ovN2YnFcPoXC0IQO1neWPUS85sbXz8xUrSUNpPk3IB-mfiHahVr46x7pk4ZPb1o31fc1c-jpGZDv7MBcrEhd-tggMHu6D4IxgBZmC8g_l8HKouyNGurHqw',
      subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
      targetEnvironment: 'sandbox',
    });
    expect(result).toEqual(
      generateSuccessResponse({
        statusCode: HttpStatus.OK,
        message: Constants.SuccessMessage,
        requestPayload: validDto,
        data: mockResponseFromValidateDisbursementAccountHolderStatus,
      })
    );
  });

  it('should return error response for unexpected error', async () => {
    (getAccountHolderStatus as jest.Mock).mockRejectedValue(false);

    await expect(validateAccountHolderStatus(validDto)).rejects.toThrow();
    expect(joi.validateJoiSchema).toHaveBeenCalledWith(validateAccountHolderStatusSchema, validDto);
    expect(getAccountHolderStatus).toHaveBeenCalledWith({
      validateAccountEndpoint: 'https://sandbox.momodeveloper.mtn.com',
      accountHolderId: '46733123451',
      accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
      bearerToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTI2VDE1OjMxOjU4LjMyMiIsInNlc3Npb25JZCI6ImMzNWE5ODJlLTg0NTQtNGVjNi05YmRmLTRlYmJhNDQzODA2YSJ9.GGoRBhCiZARzmj2Zh4lxtLqEl-ygnRoGYRUv04pGBFvliZrsSKlY_B8vSEnADrYgDkYjabXdWWwyF553NNiKAaArazNHg6iCAgTYPMazwDmUPkPm1at4KfKPIxC5AJCeF79R491SR2niPF4iLvAXbL2h7ulRcuns2dFi4pQWbfOlxwtgQhiTOM6B-tp-_mYAptHImDjfpdIt2rasWuJh6z_5M0ZpnSC6ovN2YnFcPoXC0IQO1neWPUS85sbXz8xUrSUNpPk3IB-mfiHahVr46x7pk4ZPb1o31fc1c-jpGZDv7MBcrEhd-tggMHu6D4IxgBZmC8g_l8HKouyNGurHqw',
      subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
      targetEnvironment: 'sandbox',
    });
  });

  it('should return false for number not active', async () => {
    (getAccountHolderStatus as jest.Mock).mockResolvedValue(mockResponseFromDisbursementValidateAccountHolderWithAccountNotActive);

    const result = (await validateAccountHolderStatus(validDto)) as ResponseWithData<
      ValidateAccountHolderStatusResponsePayload,
      InitiateValidateAccountHolderStatusRequestDto
    >;

    expect(joi.validateJoiSchema).toHaveBeenCalledWith(validateAccountHolderStatusSchema, validDto);
    expect(result?.data?.result).toEqual(false);
  });
});
