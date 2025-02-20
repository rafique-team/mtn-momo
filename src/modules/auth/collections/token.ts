import { ResponseWithData } from '../../../interfaces/response';
import { CreateTokenRequestDto, CreateTokenResponseData, InitiateCreateTokenParams } from '../../../interfaces/auth/token';
import { createToken } from '../token';

/**
 * createCollectionToken
 * @remarks - This is used to make an axios call to MTN collections token endpoint
 *
 * @type {Object}
 * @param {CreateTokenRequestDto} - create tokens dto
 * @returns  {Promise<ResponseWithData<CreateRequestToPayTokenResponseData, CreateRequestToPayTokenRequestDto>>} - This function returns an object of statusCode, message , requestPayload and data from mtn
 */
export async function createCollectionToken(
  dto: CreateTokenRequestDto
): Promise<ResponseWithData<CreateTokenResponseData, InitiateCreateTokenParams> | void> {
  return createToken({
    apiKey: dto.apiKey,
    apiUserId: dto.apiUserId,
    subscriptionKey: dto.subscriptionKey,
    tokenEndpoint: `${dto.baseUrl}/collection/token/`,
  });
}
