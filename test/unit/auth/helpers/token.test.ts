import axios, { AxiosResponse } from 'axios';
import { initiateCreateToken } from '../../../../src/helpers/token';
import { InitiateCreateTokenParams, InitiateCreateTokenResponse } from '../../../../src/interfaces/auth/token';
import { convertApiKeyAndApiUserToBase64 } from '../../../../src/utils/utils';

jest.mock('axios');
jest.mock('../../../../src/utils/utils');

describe('initiateCreateToken', () => {
  const mockResponseData = {
    access_token: 'mockAccessToken',
    token_type: 'Bearer',
    expires_in: 3600,
  };

  const mockResponseData2: InitiateCreateTokenResponse = {
    accessToken: 'mockAccessToken',
    tokenType: 'Bearer',
    expiresIn: 3600,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful axios POST request with correct parameters', async () => {
    const mockParams: InitiateCreateTokenParams = {
      tokenEndpoint: 'mockTokenEndpoint',
      apiUserId: 'mockApiUserId',
      apiKey: 'mockApiKey',
      subscriptionKey: 'mockSubscriptionKey',
    };

    const mockAuthorization = 'mockBase64EncodedCredentials';
    (convertApiKeyAndApiUserToBase64 as jest.MockedFunction<typeof convertApiKeyAndApiUserToBase64>).mockReturnValueOnce(mockAuthorization);

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: mockResponseData,
    } as AxiosResponse);

    const result = await initiateCreateToken(mockParams);

    expect(axios.post).toHaveBeenCalledWith(
      mockParams.tokenEndpoint,
      {},
      {
        headers: {
          Authorization: `Basic ${mockAuthorization}`,
          'Ocp-Apim-Subscription-Key': mockParams.subscriptionKey,
        },
      }
    );

    expect(result).toEqual(mockResponseData2);
  });

  it('should handle a failed axios POST request', async () => {
    const mockParams: InitiateCreateTokenParams = {
      tokenEndpoint: 'mockTokenEndpoint',
      apiUserId: 'mockApiUserId',
      apiKey: 'mockApiKey',
      subscriptionKey: 'mockSubscriptionKey',
    };

    const errorMessage = 'Failed to initiate create token';
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(initiateCreateToken(mockParams)).rejects.toThrow(errorMessage);
  });
});
