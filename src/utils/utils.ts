export const convertApiKeyAndApiUserToBase64 = (apiUser: string, apiKey: string): string => {
  const base64EncodedAuth = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  return base64EncodedAuth;
};
