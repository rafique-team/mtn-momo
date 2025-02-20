/**
 * RequestToPayStatusRequestDto
 * @remarks - This is the dto to get the status of a request to pay transaction
 *
 * @type {object}
 * @property bearerToken- Not expired token
 * @property targetEnvironment-  Target environment
 * @property subscriptionKey -  Product Subscription key
 * @property baseUrl - Remote mtn base url
 * @property requestToPayReferenceId- The refenrenece id for the request to pay transaction
 */
export interface RequestToPayStatusRequestDto {
  bearerToken: string;
  targetEnvironment: string;
  baseUrl: string;
  subscriptionKey: string;
  requestToPayReferenceId: string;
}

/**
 * RequestToPayStatusResponse
 * @remarks - This is the response from request to pay status endpoint
 *
 * @type {object}
 * @property status-  The status from calling mtn endpoint
 * @property message -  Target environment
 * @property requestPayload -  The request payload
 * @property data -  The response data
 */
export interface RequestToPayStatusResponse {
  statusCode: number;
  message: string;
  requestPayload: RequestToPayStatusRequestDto;
  data: RequestToPayStatusResponsePayload;
}

/**
 * RequestToPayStatusResponsePayload
 * @remarks - This is the response from request to pay status endpoint
 *
 * @type {object}
 * @property externalId-  External id provided in creation of request to pay
 * @property amount -  Amount to be debited from Payer account
 * @property currency-  Currency of the amount to be debited
 * @property payer -  Party identifies a account holder in the wallet platform
 * @property payerMessage - Message that will be written in the payer transaction history message field.
 * @property payeeNote - Message that will be written in the payee transaction history note field.
 * @property status  - Status of the request to pay
 * @property financialTransactionId - Financial transactionIdd from mobile money manager.Used to connect to the specific financial transaction made in the account
 * @property reason  - Failuer reason
 */
export interface RequestToPayStatusResponsePayload {
  externalId?: string;
  amount?: string;
  currency?: string;
  payer: Party;
  payerMessage?: string;
  payeeNote?: string;
  status: StatusEnum;
  financialTransactionId?: string;
  reason?: ReasonEnum;
}

/**
 * Party
 * @remarks - Party
 *
 * @type {object}
 * @property partyIdType-  PartyIdType
 * @property partyId -  Party identifies a account holder in the wallet platform
 */
export interface Party {
  partyIdType: PartyIdTypeEnum;
  partyId: string;
}

/**
 * StatusEnum
 * @remarks - Status enum
 *
 * @type {enum}
 * @property Pending-  PENDING
 * @property Successfull -  SUCCESSFULL
 * @property failed  -  FAILED
 */
export enum StatusEnum {
  'PENDING' = 'PENDING',
  'SUCCESSFULL' = 'SUCCESSFUL',
  'FAILED' = 'FAILED',
}

/**
 * ReasonEnum
 * @remarks - Reason enum
 *
 * @type {enum}
 * @property PAYEE_NOT_FOUND -
 * @property PAYER_NOT_FOUND
 * @property NOT_ALLOWED
 * @property NOT_ALLOWED_TARGET_ENVIRONMENT
 * @property INVALID_CALLBACK_URL_HOST
 * @property INVALID_CURRENCY
 * @property SERVICE_UNAVAILABLE
 * @property INTERNAL_PROCESSING_ERROR
 * @property NOT_ENOUGH_FUNDS
 * @property PAYER_LIMIT_REACHED
 * @property PAYEE_NOT_ALLOWED_TO_RECEIVE
 * @property PAYMENT_NOT_APPROVED
 * @property RESOURCE_NOT_FOUND
 * @property APPROVAL_REJECTED
 * @property EXPIRED
 * @property TRANSACTION_CANCELED
 * @property RESOURCE_ALREADY_EXIST
 */
export enum ReasonEnum {
  PAYEE_NOT_FOUND = 'PAYEE_NOT_FOUND',
  PAYER_NOT_FOUND = 'PAYER_NOT_FOUND',
  NOT_ALLOWED = 'NOT_ALLOWED',
  NOT_ALLOWED_TARGET_ENVIRONMENT = 'NOT_ALLOWED_TARGET_ENVIRONMENT',
  INVALID_CALLBACK_URL_HOST = 'INVALID_CALLBACK_URL_HOST',
  INVALID_CURRENCY = 'INVALID_CURRENCY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  INTERNAL_PROCESSING_ERROR = 'INTERNAL_PROCESSING_ERROR',
  NOT_ENOUGH_FUNDS = 'NOT_ENOUGH_FUNDS',
  PAYER_LIMIT_REACHED = 'PAYER_LIMIT_REACHED',
  PAYEE_NOT_ALLOWED_TO_RECEIVE = 'PAYEE_NOT_ALLOWED_TO_RECEIVE',
  PAYMENT_NOT_APPROVED = 'PAYMENT_NOT_APPROVED',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  APPROVAL_REJECTED = 'APPROVAL_REJECTED',
  EXPIRED = 'EXPIRED',
  TRANSACTION_CANCELED = 'TRANSACTION_CANCELED',
  RESOURCE_ALREADY_EXIST = 'RESOURCE_ALREADY_EXIST',
}

/**
 * PartyIdTypeEnum
 * @remarks - PayerIdTypeEnum
 *
 * @type {object}
 * @property MSISDN
 * @property EMAIL
 * @property PARTY_CODE
 */
export enum PartyIdTypeEnum {
  'MSISDN' = 'MSISDN',
  'EMAIL' = 'EMAIL',
  'PARTY_CODE' = 'PARTY_CODE',
}
