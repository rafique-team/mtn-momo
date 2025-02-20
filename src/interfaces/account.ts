/**
 * ValidateAccountHolderStatusRequestDto
 * @remarks - This is the dto to validate account holder status
 *
 * @type {object}
 * @property {string} bearerToken- Not expired token
 * @property {string} targetEnvironment-  Target environment
 * @property {string} subscriptionKey -  Product Subscription key
 * @property {string} baseUrl - Remote mtn base url
 * @property {string} accountHolderId - The AccountHolder number
 * @property {string} accountHolderIdType- Specifies the type of the AccountHolderID. Allowed values [msisdn, email]
 */
export interface ValidateAccountHolderStatusRequestDto {
  bearerToken: string;
  targetEnvironment: string;
  baseUrl: string;
  subscriptionKey: string;
  accountHolderId: string;
  accountHolderIdType: AccountHolderIdTypeEnum;
}

/**
 * InitiateValidateAccountHolderStatusRequestDto
 * @remarks - This is the dto to validate account holder status
 *
 * @type {object}
 * @property {string} bearerToken- Not expired token
 * @property {string} targetEnvironment-  Target environment
 * @property {string} subscriptionKey -  Product Subscription key
 * @property {string} validateAccountEndpoint - Remote mtn validate account endpoint
 * @property {string} accountHolderId - The AccountHolder number
 * @property {string} accountHolderIdType- Specifies the type of the AccountHolderID. Allowed values [msisdn, email]
 */
export interface InitiateValidateAccountHolderStatusRequestDto {
  bearerToken: string;
  targetEnvironment: string;
  validateAccountEndpoint: string;
  subscriptionKey: string;
  accountHolderId: string;
  accountHolderIdType: AccountHolderIdTypeEnum;
}
/**
 *ValidateAccountHolderStatusResponse
 * @remarks - This is the response from validate accont number status endpoint
 *
 * @type {object}
 * @property status-  The status from calling mtn endpoint
 * @property message -  Default message
 * @property requestPayload -  The request payload
 * @property data -  The response data
 */
export interface ValidateAccountHolderStatusResponse {
  statusCode: number;
  message: string;
  requestPayload: ValidateAccountHolderStatusRequestDto;
  data: ValidateAccountHolderStatusResponsePayload;
}

/**
 * TransferStatusResponsePayload
 * @remarks - This is the response from transfer status endpoint
 *
 * @type {object}
 * @property externalId-  External id provided in creation of request to pay
 */
export interface ValidateAccountHolderStatusResponsePayload {
  result: boolean;
}

/**
 * AccountHolderIdTypeEnum
 * @remarks - AccountHolderIdTypeEnum
 *
 * @type {object}
 * @property msisdn-  Msisdn
 * @property email-  Email

 */
export enum AccountHolderIdTypeEnum {
  msisdn = 'msisdn',
  email = 'email',
}
