import axios, { AxiosResponse } from 'axios';
import { AccountHolderIdTypeEnum, InitiateValidateAccountHolderStatusRequestDto } from '../../../../src/interfaces/account';
import { getAccountHolderStatus } from '../../../../src/helpers/account';

jest.mock('axios');
jest.mock('../../../../src/utils/utils');

describe('getAccountHolderStatus', () => {
  const mockResponseData = {
    result: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful axios GET request with correct parameters', async () => {
    const mockParams: InitiateValidateAccountHolderStatusRequestDto = {
      validateAccountEndpoint: 'https://sandbox.momodeveloper.mtn.com',
      accountHolderId: '46733123451',
      accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
      bearerToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTI2VDE1OjMxOjU4LjMyMiIsInNlc3Npb25JZCI6ImMzNWE5ODJlLTg0NTQtNGVjNi05YmRmLTRlYmJhNDQzODA2YSJ9.GGoRBhCiZARzmj2Zh4lxtLqEl-ygnRoGYRUv04pGBFvliZrsSKlY_B8vSEnADrYgDkYjabXdWWwyF553NNiKAaArazNHg6iCAgTYPMazwDmUPkPm1at4KfKPIxC5AJCeF79R491SR2niPF4iLvAXbL2h7ulRcuns2dFi4pQWbfOlxwtgQhiTOM6B-tp-_mYAptHImDjfpdIt2rasWuJh6z_5M0ZpnSC6ovN2YnFcPoXC0IQO1neWPUS85sbXz8xUrSUNpPk3IB-mfiHahVr46x7pk4ZPb1o31fc1c-jpGZDv7MBcrEhd-tggMHu6D4IxgBZmC8g_l8HKouyNGurHqw',
      subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
      targetEnvironment: 'sandbox',
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockResponseData,
    } as AxiosResponse);

    const result = await getAccountHolderStatus(mockParams);

    expect(axios.get).toHaveBeenCalledWith(mockParams.validateAccountEndpoint, {
      headers: {
        Authorization: `Bearer ${mockParams.bearerToken}`,
        'Ocp-Apim-Subscription-Key': mockParams.subscriptionKey,
        'X-Target-Environment': mockParams.targetEnvironment,
      },
    });

    expect(result).toEqual(mockResponseData);
  });

  it('should handle a failed axios GET request', async () => {
    const mockParams: InitiateValidateAccountHolderStatusRequestDto = {
      validateAccountEndpoint: 'https://sandbox.momodeveloper.mtn.com',
      accountHolderId: '46733123451',
      accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
      bearerToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTI2VDE1OjMxOjU4LjMyMiIsInNlc3Npb25JZCI6ImMzNWE5ODJlLTg0NTQtNGVjNi05YmRmLTRlYmJhNDQzODA2YSJ9.GGoRBhCiZARzmj2Zh4lxtLqEl-ygnRoGYRUv04pGBFvliZrsSKlY_B8vSEnADrYgDkYjabXdWWwyF553NNiKAaArazNHg6iCAgTYPMazwDmUPkPm1at4KfKPIxC5AJCeF79R491SR2niPF4iLvAXbL2h7ulRcuns2dFi4pQWbfOlxwtgQhiTOM6B-tp-_mYAptHImDjfpdIt2rasWuJh6z_5M0ZpnSC6ovN2YnFcPoXC0IQO1neWPUS85sbXz8xUrSUNpPk3IB-mfiHahVr46x7pk4ZPb1o31fc1c-jpGZDv7MBcrEhd-tggMHu6D4IxgBZmC8g_l8HKouyNGurHqw',
      subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
      targetEnvironment: 'sandbox',
    };

    const errorMessage = 'Failed to initiate get account status';
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getAccountHolderStatus(mockParams)).rejects.toThrow(errorMessage);
  });
});
