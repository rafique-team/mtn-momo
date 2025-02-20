import { AccountHolderIdTypeEnum, ValidateAccountHolderStatusRequestDto } from '../../../src/interfaces/account';
import { validateAccountHolderStatus } from '../../../src/modules/account';
import { validateAccountHolderStatusForDisbursements } from '../../../src/modules/disbursements/account';

jest.mock('../../../src/modules/account.ts', () => ({
  validateAccountHolderStatus: jest.fn(),
}));

describe('validateAccountHolderStatusForDisbursements', () => {
  it('should callvalidateAccountHolderStatusForDisbursements with correct parameters', async () => {
    const dto: ValidateAccountHolderStatusRequestDto = {
      baseUrl: 'https://sandbox.momodeveloper.mtn.com',
      accountHolderId: '46733123451',
      accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
      bearerToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImEwMzJlMWE1LTE2ZTEtNDkxMi05NDQ1LTg0ZWY2NDRmMDA1OCIsImV4cGlyZXMiOiIyMDI0LTAxLTMwVDEyOjQ3OjMyLjA1OCIsInNlc3Npb25JZCI6Ijk5NzNlYjZlLWU3YWItNDdmZC05ZjRiLWZiMDJiZmIxYzA3OSJ9.h8sJdWX6EPZelczwRXBW4ZnQrrf-wM0nGi8ligy53a9MURphb77IL9m-uJNaUhSOIvRC-0zdhSRhGx8gQzSpczzbmn4xWqKQENCf9CyQ4TdZqe_aQSw3Y_wfVvDQ4HOPMm42-WLBTZEMWwIfWmIf6RzmnICJaDZ4JGnJXFHiKWxkXsA3LYhbywQ83kIXYri5UdOr9Jg26xhp_-vUzKwKT1nc6VXZGGSW07yfPaBBS-GmidKi-fKVtm7E5izot4CFDUfk__fK55OlXv2kaRgHm8SckXx4CKeJPbHi-rRRkieris25194pxFbzaBbyVVN3goUXAdEzj-30sy1sfjwvjg',
      subscriptionKey: 'bc35f0d89c8a406e821b7febfc3b300f',
      targetEnvironment: 'sandbox',
    };

    await validateAccountHolderStatusForDisbursements(dto);

    expect(validateAccountHolderStatus).toHaveBeenCalledWith({
      validateAccountEndpoint: `${dto.baseUrl}/disbursement/v1_0/accountholder/${dto.accountHolderIdType}/${dto.accountHolderId}/active`,
      accountHolderId: dto.accountHolderId,
      bearerToken: dto.bearerToken,
      subscriptionKey: dto.subscriptionKey,
      targetEnvironment: dto.targetEnvironment,
      accountHolderIdType: dto.accountHolderIdType,
    });
  });
});
