/**
 * RequestToPayRequestDto
 * @remarks - This is the dto to create an mtn request to pay token
 *
 * @type {object}
 * @property bearerToken- Not expired token
 * @property referenceId-  A unique reference for the transaction
 * @property targetEnvironment-  Target environment
 * @property subscriptionKey -  Product Subscription key
 * @property baseUrl - Remote mtn base url
 * @property amount- Transaction amount
 * @property currency-  Transaction amount currency
 * @property externalId --  ExternalId
 * @property callbackUrl --  Callback url for the transaction
 * @property payerPartyIdType - Account holder id type eg MSISDN or EMAIL
 * @property payerPartyId - Account holder id eg 544413229
 * @property payermessage - Message that will be written in the payer transaction history message field.
 * @property payeeNote - Message that will be written in the payee transaction history note field.
 */
export interface RequestToPayRequestDto {
  bearerToken: string;
  referenceId: string;
  targetEnvironment: string;
  baseUrl: string;
  subscriptionKey: string;
  callbackUrl?: string;
  amount: string;
  currency: string;
  externalId?: string;
  payerPartyIdType: string;
  payerPartyId: string;
  payerMessage?: string;
  payeeNote?: string;
}

/**
 * RequestToPayResponse
 * @remarks - This is the response from request to pay
 *
 * @type {object}
 * @property status-  The status from calling mtn endpoint
 * @property message -  Target environment
 * @property requestPayload -  The request payload
 * @property data -  The response data
 */
export interface RequestToPayResponse {
  statusCode: number;
  message: string;
  requestPayload: object;
  data: object;
}
