import axios, { AxiosResponse } from 'axios';
import { getTransferStatus } from '../../../../src/helpers/disbursements/transferStatus';
import { TransferStatusRequestDto, TransferStatusResponsePayload } from '../../../../src/interfaces/disbursements/transferStatus';
import { PartyIdTypeEnum, StatusEnum } from '../../../../src/interfaces/collections/requestToPayStatus';

jest.mock('axios');

describe('getTransferStatusHelper', () => {
  const mockResponseData: TransferStatusResponsePayload = {
    externalId: 'test-external-Id',
    amount: '500',
    currency: 'EURO',
    payee: {
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
    const mockParams: TransferStatusRequestDto = {
      baseUrl: 'mockEndpoint',
      transferReferenceId: 'mockReferenceId',
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
    } as AxiosResponse<TransferStatusResponsePayload>);

    const result = await getTransferStatus(mockParams);

    expect(axios.get).toHaveBeenCalledWith(`${mockParams.baseUrl}//disbursement/v1_0/transfer/${mockParams.transferReferenceId}`, {
      headers: expectedHeaders,
    });

    expect(result).toEqual(mockResponseData);
  });
});
