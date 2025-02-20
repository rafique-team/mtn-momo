import axios, { AxiosResponse } from 'axios';
import { processTransfer } from '../../../../src/helpers/disbursements/transfer';
import { TransferRequestDto, TransferResponsePayload } from '../../../../src/interfaces/disbursements/transfer';
import { PartyIdTypeEnum } from '../../../../src/interfaces/collections/requestToPayStatus';

jest.mock('axios');

describe('processTransfer', () => {
  const mockResponseData: TransferResponsePayload = {
    requestPayload: {
      baseUrl: 'mockTransferEndpoint',
      amount: '100',
      currency: 'USD',
      externalId: '123',
      payeePartyIdType: PartyIdTypeEnum.MSISDN,
      payeePartyId: '987654321',
      payerMessage: 'Payment for service',
      payeeNote: 'Thank you for your payment',
      bearerToken: 'mockBearerToken',
      subscriptionKey: 'mockSubscriptionKey',
      referenceId: 'mockReferenceId',
      targetEnvironment: 'mockTargetEnvironment',
      callbackUrl: 'https://example.com/callback',
    },
    statusCode: 202,
    message: 'Successfull',
    data: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful axios POST request with correct parameters', async () => {
    const mockParams: TransferRequestDto = {
      baseUrl: 'mockbaseUrl',
      amount: '100',
      currency: 'USD',
      externalId: '123',
      payeePartyIdType: PartyIdTypeEnum.MSISDN,
      payeePartyId: '987654321',
      payerMessage: 'Payment for service',
      payeeNote: 'Thank you for your payment',
      bearerToken: 'mockBearerToken',
      subscriptionKey: 'mockSubscriptionKey',
      referenceId: 'mockReferenceId',
      targetEnvironment: 'mockTargetEnvironment',
      callbackUrl: 'https://example.com/callback',
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: mockResponseData,
    } as AxiosResponse<TransferResponsePayload>);

    const result = await processTransfer(mockParams);

    expect(axios.post).toHaveBeenCalledWith(
      `${mockParams.baseUrl}/disbursement/v1_0/transfer`,
      {
        amount: mockParams.amount,
        currency: mockParams.currency,
        externalId: mockParams.externalId,
        payee: {
          partyIdType: mockParams.payeePartyIdType,
          partyId: mockParams.payeePartyId,
        },
        payerMessage: mockParams.payerMessage,
        payeeNote: mockParams.payeeNote,
      },
      {
        headers: {
          Authorization: `Bearer ${mockParams.bearerToken}`,
          'Ocp-Apim-Subscription-Key': mockParams.subscriptionKey,
          'X-Reference-Id': mockParams.referenceId,
          'X-Target-Environment': mockParams.targetEnvironment,
          'X-Callback-Url': mockParams.callbackUrl,
        },
      }
    );

    expect(result).toEqual(mockResponseData);
  });

  it('should handle a failed axios POST request', async () => {
    const mockParams: TransferRequestDto = {
      baseUrl: 'mockbaseUrl',
      amount: '100',
      currency: 'USD',
      externalId: '123',
      payeePartyIdType: PartyIdTypeEnum.MSISDN,
      payeePartyId: '987654321',
      payerMessage: 'Payment for service',
      payeeNote: 'Thank you for your payment',
      bearerToken: 'mockBearerToken',
      subscriptionKey: 'mockSubscriptionKey',
      referenceId: 'mockReferenceId',
      targetEnvironment: 'mockTargetEnvironment',
      callbackUrl: 'https://example.com/callback',
    };

    const errorMessage = 'Failed to process transfer';
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(processTransfer(mockParams)).rejects.toThrow(errorMessage);
  });
});
