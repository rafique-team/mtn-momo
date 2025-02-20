import { Constants } from '../common/enums/generic.enum';
import { CaughtError, RequestResponse, ResponseWithData } from '../interfaces/response';
import { HttpStatus } from '@nestjs/common';

export class CustomError<T, U> extends Error {
  code: number | null;
  statusCode: number | null;
  requestPayload: T | null;
  responsePayload: U | null;
  statusText: string | null;

  constructor(
    message: string,
    statusCode: number | null = null,
    requestPayload: T | null = null,
    responsePayload: U | null = null,
    statusText: string | null = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.requestPayload = requestPayload;
    this.responsePayload = responsePayload;
    this.statusText = statusText;
  }
}

export function throwError<T, U>(
  message: string,
  statusCode: number | null = null,
  requestPayload: U | null = null,
  responsePayload: T | null = null,
  statusText: string | null = null
): never {
  throw new CustomError(message, statusCode, requestPayload, responsePayload, statusText);
}

export function generateSuccessResponse<T, U>(response: RequestResponse<T, U>): ResponseWithData<T, U> {
  if (!response.data) {
    return {
      statusCode: response.statusCode,
      message: response.message,
      requestPayload: response.requestPayload,
    };
  }

  return {
    statusCode: response.statusCode,
    message: response.message,
    requestPayload: response.requestPayload,
    data: response.data,
  };
}

export function generateErrorResponse<T, U>(error: CaughtError, requestPayload: U, responsePayload?: T): ResponseWithData<T, U> {
  if ((!error.code || typeof error.code !== 'string') && !error.statusCode) {
    throwError(Constants.ServerError, HttpStatus.INTERNAL_SERVER_ERROR, requestPayload, responsePayload);
  } else if (error.statusCode) {
    throwError(error?.message, error?.statusCode, requestPayload, error?.response?.data, error?.statusText);
  } else {
    throwError(error?.response?.data?.message, error?.response?.status, requestPayload, error?.response?.data, error?.response?.statusText);
  }
}

export function generateValidationErrorResponse<T, U>(message: string, statusCode: number, requestPayload: T, data?: U): void {
  throwError(message, statusCode, requestPayload, data, message);
}
