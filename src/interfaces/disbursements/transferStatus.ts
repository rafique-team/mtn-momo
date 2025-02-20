import { Party, StatusEnum, ReasonEnum } from '../collections/requestToPayStatus';

/**
 * TransferStatusRequestDto
 * @remarks - This is the dto to get the status of a transfer
 *
 * @type {object}
 * @property bearerToken- Not expired token
 * @property targetEnvironment-  Target environment
 * @property subscriptionKey -  Product Subscription key
 * @property baseUrl - Remote mtn tbase url
 * @property transferReferenceId- The referenece id for the transfer 

 */
export interface TransferStatusRequestDto {
  bearerToken: string;
  targetEnvironment: string;
  baseUrl: string;
  subscriptionKey: string;
  transferReferenceId: string;
}
/**
 *TransferStatusResponse
 * @remarks - This is the response from transfer status endpoint
 *
 * @type {object}
 * @property status-  The status from calling mtn endpoint
 * @property message -  Default message
 * @property requestPayload -  The request payload
 * @property data -  The response data
 */
export interface TransferStatusResponse {
  statusCode: number;
  message: string;
  requestPayload: TransferStatusRequestDto;
  data: TransferStatusResponsePayload;
}

/**
 * TransferStatusResponsePayload
 * @remarks - This is the response from transfer status endpoint
 *
 * @type {object}
 * @property externalId-  External id provided in creation of request to pay
 * @property amount -  Amount to be debited from Payer account
 * @property currency-  Currency of the amount to be debited
 * @property payer -  Party identifies a account holder in the wallet platform
 * @property payerMessage - Message that will be written in the payer transaction history message field.
 * @property payeeNote - Message that will be written in the payee transaction history note field.
 * @property status  - Status of the request to pay
 * @property financialTransactionId - Financial transactionId from mobile money manager.Used to connect to the specific financial transaction made in the account
 * @property reason  - Failuer reason
 */
export interface TransferStatusResponsePayload {
  externalId?: string;
  amount?: string;
  currency?: string;
  payee: Party;
  payerMessage?: string;
  payeeNote?: string;
  status: StatusEnum;
  financialTransactionId?: string;
  reason?: ReasonEnum;
}
