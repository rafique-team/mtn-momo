import { collections } from '../../src/index';
import { RequestToPayRequestDto, RequestToPayResponse } from '../../src/interfaces/collections/requestToPay';

jest.mock('axios');

describe('Collections Module', () => {
  it('should process payment successfully', async () => {
    const requestDetails: RequestToPayRequestDto = {
      subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
      baseUrl: 'https://sandbox.momodeveloper.mtn.com',
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

    const responseDetails = {
      statusCode: 202,
      message: 'Successfull',
      requestPayload: {
        subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
        baseUrl: 'https://sandbox.momodeveloper.mtn.com',
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
    } as RequestToPayResponse;

    const result = await collections.requestToPay(requestDetails);
    expect(result).toEqual(responseDetails);
  });
});
