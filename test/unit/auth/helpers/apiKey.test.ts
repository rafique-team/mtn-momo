import axios, { AxiosResponse } from 'axios';
import { initiateCreateApiKey } from '../../../../src/helpers/apiKey';
import { CreateApiKeyRequestDto, CreateApiKeyResponseData } from '../../../../src/interfaces/auth/apiKey';

jest.mock('axios');

describe('initiateCreateApiKey', () => {
  const mockResponseData: CreateApiKeyResponseData = {
    apikey: 'test-api-key',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful axios POST request with correct parameters', async () => {
    const mockParams: CreateApiKeyRequestDto = {
      baseUrl: 'mockbaseUrl',
      apiUserReferenceId: 'mockApiUserReferenceId',
      referenceId: 'mockReferenceId',
      subscriptionKey: 'mockSubscriptionKey',
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: mockResponseData,
    } as AxiosResponse<CreateApiKeyResponseData>);

    const result = await initiateCreateApiKey(mockParams);

    expect(axios.post).toHaveBeenCalledWith(
      `${mockParams.baseUrl}/v1_0/apiuser/${mockParams.apiUserReferenceId}/apikey`,
      {},
      {
        headers: {
          'X-Reference-Id': mockParams.referenceId,
          'Ocp-Apim-Subscription-Key': mockParams.subscriptionKey,
        },
      }
    );

    expect(result).toEqual(mockResponseData);
  });

  it('should handle a failed axios POST request', async () => {
    const mockParams: CreateApiKeyRequestDto = {
      baseUrl: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
      referenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
      apiUserReferenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
      subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
    };

    const errorMessage = 'Failed to initiate create API key';
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(initiateCreateApiKey(mockParams)).rejects.toThrow(errorMessage);
  });
});
