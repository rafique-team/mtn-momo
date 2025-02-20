import { convertApiKeyAndApiUserToBase64 } from '../../src/utils/utils';

describe('convertApiKeyAndApiUserToBase64', () => {
  it('should encode apiUser and apiKey to base64', () => {
    const apiUser = 'mockApiUser';
    const apiKey = 'mockApiKey';
    const expectedBase64 = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');

    const result = convertApiKeyAndApiUserToBase64(apiUser, apiKey);

    expect(result).toEqual(expectedBase64);
  });

  it('should handle empty apiUser and apiKey', () => {
    const apiUser = '';
    const apiKey = '';
    const expectedBase64 = Buffer.from(':').toString('base64');

    const result = convertApiKeyAndApiUserToBase64(apiUser, apiKey);

    expect(result).toEqual(expectedBase64);
  });
});
