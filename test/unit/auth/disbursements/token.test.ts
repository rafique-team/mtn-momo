import { createToken } from '../../../../src/modules/auth/token';
import { createDisbursementToken } from '../../../../src/modules/auth/disbursements/token';
import { CreateTokenRequestDto } from '../../../../src/interfaces/auth/token';

jest.mock('../../../../src/modules/auth/token', () => ({
  createToken: jest.fn(),
}));

describe('createDisbursementToken', () => {
  it('should call createToken with correct parameters', async () => {
    const dto: CreateTokenRequestDto = {
      apiKey: 'b52c894ea5f74fdfa23eb43de9a785ce',
      apiUserId: '8fd6e137-7734-4a10-84ce-8b95a92e0266',
      subscriptionKey: 'bc35f0d89c8a406e821b7febfc3b300f',
      baseUrl: 'https://sandbox.momodeveloper.mtn.com',
    };

    await createDisbursementToken(dto);

    expect(createToken).toHaveBeenCalledWith({
      apiKey: dto.apiKey,
      apiUserId: dto.apiUserId,
      subscriptionKey: dto.subscriptionKey,
      tokenEndpoint: `${dto.baseUrl}/disbursement/token/`,
    });
  });
});
