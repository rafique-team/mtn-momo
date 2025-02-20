import {
  AccountHolderIdTypeEnum,
  InitiateValidateAccountHolderStatusRequestDto,
  ValidateAccountHolderStatusRequestDto,
  ValidateAccountHolderStatusResponse,
  ValidateAccountHolderStatusResponsePayload,
} from '../../../src/interfaces/account';
/**
 * Creates a success response object for validate account holder status
 *
 * @param {Object} payload - The request payload.
 * @returns {Object} - The success response object.
 * @property {Object} requestPayload - The original request payload.
 * @property {number} statusCode - The HTTP status code (200 for success).
 * @property {string} message - A descriptive message indicating the success.
 * @property {Object} data - The data object containing access token details.
 * @property {boolean} data.result- The result of the call
 * */
export const validateDisbursementAccountHolderStatusSuccessResponse = (
  payload: ValidateAccountHolderStatusRequestDto
): ValidateAccountHolderStatusResponse => {
  return {
    requestPayload: { ...payload },
    statusCode: 200,
    message: 'Successfull',
    data: {
      result: true,
    },
  };
};

/**
 * Mock response from validate disbursement account holder status
 *
 * @property {boolean} result - The result.
 * */
export const mockResponseFromValidateDisbursementAccountHolderStatus: ValidateAccountHolderStatusResponsePayload = {
  result: true,
};

/**
 * Mock request body for ValidateDisburementAccountHolderStatusMockJson
 *
 * @property {string} baseUrl - The  base url
 * @property {string} accountHolderId - The account holder id
 * @property {number} accountHolderIdType - The account holder id type
 * @property {number} bearerToken - The bearer token
 * @property {number} subscriptionKey - The subscription key
 * @property {number} targetEnvironment - The target environment
 * */
export const validateDisbursementAccountHolderStatusMockJson: InitiateValidateAccountHolderStatusRequestDto = {
  validateAccountEndpoint: 'https://sandbox.momodeveloper.mtn.com',
  accountHolderId: '46733123451',
  accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
  bearerToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjNlMmI2ZjA4LWQzY2UtNDJhNy04Mjc3LTJkNTdkYzBhM2IzMSIsImV4cGlyZXMiOiIyMDI0LTAxLTI2VDE1OjMxOjU4LjMyMiIsInNlc3Npb25JZCI6ImMzNWE5ODJlLTg0NTQtNGVjNi05YmRmLTRlYmJhNDQzODA2YSJ9.GGoRBhCiZARzmj2Zh4lxtLqEl-ygnRoGYRUv04pGBFvliZrsSKlY_B8vSEnADrYgDkYjabXdWWwyF553NNiKAaArazNHg6iCAgTYPMazwDmUPkPm1at4KfKPIxC5AJCeF79R491SR2niPF4iLvAXbL2h7ulRcuns2dFi4pQWbfOlxwtgQhiTOM6B-tp-_mYAptHImDjfpdIt2rasWuJh6z_5M0ZpnSC6ovN2YnFcPoXC0IQO1neWPUS85sbXz8xUrSUNpPk3IB-mfiHahVr46x7pk4ZPb1o31fc1c-jpGZDv7MBcrEhd-tggMHu6D4IxgBZmC8g_l8HKouyNGurHqw',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
  targetEnvironment: 'sandbox',
};

/**
 * Mock response for Account not active
 *
 * @property {boolean} result - The  base url
 * */

export const mockResponseFromDisbursementValidateAccountHolderWithAccountNotActive: ValidateAccountHolderStatusResponsePayload = {
  result: false,
};
