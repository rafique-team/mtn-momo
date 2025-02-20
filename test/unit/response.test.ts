import { CaughtError } from '../../src/interfaces/response';
import {
  throwError,
  generateSuccessResponse,
  generateValidationErrorResponse,
  CustomError,
  generateErrorResponse,
} from '../../src/utils/response';

describe('Response Utils', () => {
  describe('throwError', () => {
    it('should throw CustomError with specified properties', () => {
      const errorMessage = 'Test Error';
      const statusCode = 500;
      const requestPayload = { key: 'value' };
      const responsePayload = { error: 'Error details' };
      const statusText = 'Internal Server Error';

      try {
        throwError(errorMessage, statusCode, requestPayload, responsePayload, statusText);
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toEqual(errorMessage);
        expect(error.statusCode).toEqual(statusCode);
        expect(error.requestPayload).toEqual(requestPayload);
        expect(error.responsePayload).toEqual(responsePayload);
        expect(error.statusText).toEqual(statusText);
      }
    });

    it('should throw CustomError with default properties', () => {
      const errorMessage = 'Test Error';

      try {
        throwError(errorMessage);
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toEqual(errorMessage);
        expect(error.statusCode).toBeNull();
        expect(error.requestPayload).toBeNull();
        expect(error.responsePayload).toBeNull();
        expect(error.statusText).toBeNull();
      }
    });
  });

  describe('generateSuccessResponse', () => {
    it('should generate success response without data', () => {
      const response = {
        statusCode: 200,
        message: 'Success',
        requestPayload: { key: 'value' },
      };

      const result = generateSuccessResponse(response);

      expect(result).toEqual(response);
    });

    it('should generate success response with data', () => {
      const response = {
        statusCode: 200,
        message: 'Success',
        requestPayload: { key: 'value' },
        data: { responseData: 'data' },
      };

      const result = generateSuccessResponse(response);

      expect(result).toEqual(response);
    });
  });

  describe('generateValidationErrorResponse', () => {
    it('should generate validation error response', () => {
      const message = 'Validation Error';
      const statusCode = 400;
      const requestPayload = { key: 'value' };
      const data = { validationErrors: ['Invalid input'] };

      try {
        generateValidationErrorResponse(message, statusCode, requestPayload, data);
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toEqual(message);
        expect(error.statusCode).toEqual(statusCode);
        expect(error.requestPayload).toEqual(requestPayload);
        expect(error.responsePayload).toEqual(data);
        expect(error.statusText).toEqual(message);
      }
    });
  });

  describe('generateErrorResponse', () => {
    it('should throw CustomError with error.statusCode', () => {
      const error = {
        code: '500',
        message: 'Not Found',
      } as unknown as CaughtError;
      const requestPayload = { key: 'value' };

      try {
        generateErrorResponse(error, requestPayload);
      } catch (thrownError) {
        expect(thrownError).toBeInstanceOf(CustomError);
        expect(thrownError.statusCode).toEqual(null);
      }
    });

    it('should throw CustomError with error.response.status', () => {
      const error = {
        code: 500,
        data: { responseData: 'data' },
        message: 'An error occured',
        response: {
          code: 500,
          data: { responseData: 'data' },
          message: 'An error occured',
          response: { responseData: 'data' },
          statusCode: 500,
          statusText: 'An error occured',
        },
        statusCode: 500,
        statusText: 'An error occured',
      } as unknown as CaughtError;
      const requestPayload = { key: 'value' };

      try {
        generateErrorResponse(error, requestPayload);
      } catch (thrownError) {
        expect(thrownError).toBeInstanceOf(CustomError);
        expect(thrownError.statusCode).toEqual(500);
        expect(thrownError.requestPayload).toEqual(requestPayload);
        expect(thrownError.responsePayload).toEqual({ responseData: 'data' });
        expect(thrownError.status).toEqual(undefined);
      }
    });
  });
});
