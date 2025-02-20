import axios, { AxiosResponse } from 'axios';
import { processRequestToPay } from '../../../../src/helpers/collections/requestToPay';
import { RequestToPayRequestDto, RequestToPayResponse } from '../../../../src/interfaces/collections/requestToPay';

jest.mock('axios');

describe('processRequestToPay', () => {
  const mockResponseData: RequestToPayResponse = {
    statusCode: 202,
    message: 'Successfull',
    requestPayload: {
      subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
      requestToPayEndpoint: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
      bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
      targetEnvironment: 'sandbox',
      referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
      amount: '500',
      currency: 'GHS',
      payerPartyId: '46733123453',
      payerPartyIdType: 'MSISDN',
      externalId: 'external-id',
      payeeNote: 'This is a note',
      payerMessage: 'This is a message',
    },
    data: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle a successful axios POST request', async () => {
    const mockParams: RequestToPayRequestDto = {
      subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
      baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
      bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
      targetEnvironment: 'sandbox',
      referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
      amount: '500',
      currency: 'GHS',
      payerPartyId: '46733123453',
      payerPartyIdType: 'MSISDN',
      externalId: 'external-id',
      payeeNote: 'This is a note',
      payerMessage: 'This is a message',
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: mockResponseData,
    } as AxiosResponse<RequestToPayResponse>);

    const result = await processRequestToPay(mockParams);

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.any(Object));

    expect(result).toEqual(mockResponseData);
  });
});
