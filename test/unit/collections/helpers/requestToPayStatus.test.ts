import axios, { AxiosResponse } from 'axios';
import { getRequestToPayStatus } from '../../../../src/helpers/collections/requestToPayStatus';
import {
  PartyIdTypeEnum,
  RequestToPayStatusRequestDto,
  RequestToPayStatusResponsePayload,
  StatusEnum,
} from '../../../../src/interfaces/collections/requestToPayStatus';

jest.mock('axios');

describe('getRequestToPayStatusHelper', () => {
  const mockResponseData: RequestToPayStatusResponsePayload = {
    externalId: 'test-external-Id',
    amount: '500',
    currency: 'EURO',
    payer: {
      partyIdType: PartyIdTypeEnum.MSISDN,
      partyId: '544413229',
    },
    payerMessage: 'This is a message',
    payeeNote: 'This is a note',
    status: StatusEnum.SUCCESSFULL,
    financialTransactionId: 'test',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful axios GET request with correct parameters', async () => {
    const mockParams: RequestToPayStatusRequestDto = {
      baseUrl: 'mockEndpoint',
      requestToPayReferenceId: 'mockReferenceId',
      bearerToken: 'mockBearerToken',
      subscriptionKey: 'mockSubscriptionKey',
      targetEnvironment: 'mockTargetEnvironment',
    };

    const expectedHeaders = {
      Authorization: `Bearer ${mockParams.bearerToken}`,
      'Ocp-Apim-Subscription-Key': mockParams.subscriptionKey,
      'X-Target-Environment': mockParams.targetEnvironment,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockResponseData,
    } as AxiosResponse<RequestToPayStatusResponsePayload>);

    const result = await getRequestToPayStatus(mockParams);

    expect(axios.get).toHaveBeenCalledWith(`${mockParams.baseUrl}/collection/v1_0/requesttopay/${mockParams.requestToPayReferenceId}`, {
      headers: expectedHeaders,
    });

    expect(result).toEqual(mockResponseData);
  });
});
