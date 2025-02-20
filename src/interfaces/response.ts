import { AxiosResponse } from 'axios';

/**
 * RequestResponse
 * @remarks - This is the default Request Response
 * @type {object}
 * @param statusCode - Status code of resposne
 * @param message -  specific endpoint to request the resource from
 * @param data -  Response data
 * @param requestPayload - request payload
 */
export interface RequestResponse<T, U> {
  statusCode: number;
  message: string;
  data?: T;
  requestPayload: U;
}

/**
 * caughtError
 * @remarks - Caught error
 * @type {object}
 * @param code - The serror code
 * @param message-  The error message
 */
export interface CaughtError {
  response: AxiosResponse;
  data: Record<string, number | string | object>;
  code: number;
  message: string;
  statusCode: number;
  statusText: string;
}

/**
 * ResponseWithoutData
 * @remarks - Response without data interface
 * @type {object}
 * @param statusCode - Status code of resposne
 * @param message -  specific endpoint to request the resource from
 * @param requestPayload - request payload
 */

export interface ResponseWithoutData<T> {
  statusCode: number;
  message: string;
  requestPayload: T;
}

/**
 * ResponseWithData
 * @remarks - Response with data interface
 * @type {object}
 * @param statusCode - Status code of resposne
 * @param message -  specific endpoint to request the resource from
 * @param data -  Response data
 * @param requestPayload - request payload
 */

export interface ResponseWithData<T, U> extends ResponseWithoutData<U> {
  data?: T;
}
