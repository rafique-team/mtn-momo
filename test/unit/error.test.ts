import { throwError } from '../../src/utils/error';

describe('Error Utils', () => {
  describe('throwError', () => {
    it('should throw CustomError with specified properties', () => {
      const errorMessage = 'Test Error';
      const errorCode = 500;

      try {
        throwError(errorMessage, errorCode);
      } catch (error) {
        expect(error.message).toEqual(errorMessage);
        expect(error.code).toEqual(errorCode);
      }
    });

    it('should throw CustomError with default code (null)', () => {
      const errorMessage = 'Test Error';

      try {
        throwError(errorMessage);
      } catch (error) {
        expect(error.message).toEqual(errorMessage);
        expect(error.code).toBeNull();
      }
    });
  });
});
