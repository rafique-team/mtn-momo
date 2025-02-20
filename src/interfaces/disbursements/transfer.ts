import { PartyIdTypeEnum } from '../collections/requestToPayStatus';

/**
 * TransferRequestDto
 * @remarks - This is the dto for transfer
 *
 * @type {object}
 * @property bearerToken- Not expired token
 * @property targetEnvironment-  Target environment
 * @property subscriptionKey -  Product Subscription key
 * @property baseUrl - Remote mtn base url
 * @property referenceId- The unique UUIDV4 refenrenece id for the transfer
 * @property callbackUrl- Callback url for the transfer
 * @property amount-  Amount to be transferred
 * @property currency -  ISO4217 Currency
 * @property externalId - External id is used as a reference to the transaction
 * @property payeePartyId-  Payer party id
 * @property payeeMessage- Message that will be written in the payer transaction history message field.
 * @property payeeNote -  Message that will be written in the payee transaction history note field.
 */
export interface TransferRequestDto {
  bearerToken: string;
  referenceId: string;
  targetEnvironment: string;
  baseUrl: string;
  subscriptionKey: string;
  callbackUrl?: string;
  amount: string;
  currency: string;
  externalId?: string;
  payeePartyIdType: PartyIdTypeEnum;
  payeePartyId: string;
  payerMessage?: string;
  payeeNote?: string;
}
/**
 *TransferResponse
 * @remarks - This is the response from transfer endpoint
 *
 * @type {object}
 * @property status-  The status from calling mtn endpoint
 * @property message -  Default message
 * @property requestPayload -  The request payload
 * @property data -  The response data
 */
export interface TransferResponse {
  statusCode: number;
  message: string;
  requestPayload: TransferRequestDto;
  data: TransferResponsePayload;
}

/**
 *TransferResponsePayload
 * @remarks - This is the response from transfer endpoint
 *
 * @type {object}
 */
export interface TransferResponsePayload {}
