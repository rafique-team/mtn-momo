import axios, { AxiosResponse } from 'axios';
import { initiateCreateApiUser } from '../../../../src/helpers/apiUser';
import { CreateApiUserRequestDto, CreateApiUserResponseData } from '../../../../src/interfaces/auth/apiUser';

jest.mock('axios');

describe('initiateCreateApiUser', () => {
  const mockResponseData: CreateApiUserResponseData = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful axios POST request with correct parameters', async () => {
    const mockParams: CreateApiUserRequestDto = {
      baseUrl: 'mockApiKeyEndpoint',
      referenceId: 'mockReferenceId',
      subscriptionKey: 'mockSubscriptionKey',
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: mockResponseData,
    } as AxiosResponse<CreateApiUserResponseData>);

    const result = await initiateCreateApiUser(mockParams);

    expect(axios.post).toHaveBeenCalledWith(
      `${mockParams.baseUrl}/v1_0/apiuser`,
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
});
