# MTN INTEGRATION

---

## Table of Contents

[Introduction](#introduction)<br>
[Language and tools](#language-and-tools)<br>
[Project Structure](#project-structure)<br>
[Installation](#installation)<br> - [On developemnt using npm](#on-developemnt-using-npm)<br> - [Test](#tests)<br> - [Documentation](#documentation)<br>
[Functions and methods](#functions-and-methods)<br>

- [Authentication](#authentication)<br>
  - [createApiUser](#createapiuser)<br>
  - [createApiKey](#createapikey)<br>
  - [createCollectionToken](#createcollectiontoken)<br>
  - [createDisbursementToken](#createdisbursementtoken)<br>
- [Collections](#collections)<br>
  - [validateAccountHolderStatusForCollections](#validateaccountholderstatusforcollections)<br>
  - [requestToPay](#requesttopay)<br>
  - [requestToPayStatus](#requesttopaystatus)<br>
- [Disbursements](#disbursements)<br>
  - [validateAccountHolderStatusForDisbursements](#validateaccountholderstatusfordisbursements)<br>
  - [transfer](#transfer)<br>
  - [transferStatus](#transfer-status)<br>

## Introduction

This repository contains the source code for the MTN integration module.

This service exposes some methods and functions for communication with MTN .

## Language and tools

The service is developed using NodeJS and NestJS

Additionally, the project is written using ES6/ES7 features and follows a recommended folder structure as follows:

## Project Structure

```

├── src                                                  # Contains all service logic
│   ├── common                                           # Contains scommon files
|   |   ├──enums
│   ├── config                                           # Contains configs for service
│   │   ├── config.ts
│   └── helpers                                          # Contains helpers files
│   │    ├── collections
│   │    |   ├── requestToPay.ts
│   │    |   ├── requestToPayStatus.ts
│   │    ├── disbursements
│   │    |   ├── transfer.ts
│   │    |   ├── transferStatus.ts
│   │    ├── account.ts
│   │    ├── apiKey.ts
│   │    ├── apiUser.ts
│   │    ├── token.ts
│   └── interfaces                                          # Contains all interfaces
│   │    ├── auth
│   │    |   ├── apiKey.ts
│   │    |   ├── apiUser.ts
│   │    |   ├── token.ts
│   │    ├── collections
│   │    |   ├── requestToPay.ts
│   │    |   ├── requestToPayStatus.ts
│   │    ├── disbursements
│   │    |   ├── transfer.ts
│   │    |   ├── transferStatus.ts
│   │    ├── account.ts
│   │    ├── joi.ts
│   │    ├── response.ts
│   └── modules                                          # Contains all mtn integration modules
│   │    ├── auth
│   │    |   ├── collections
│   │    |   |   ├── token.ts
│   │    |   ├── disbursements
│   │    |   |   ├── token.ts
│   │    |   ├── apiKey.ts
│   │    |   ├── apiUser.ts
│   │    |   ├── index.ts
│   │    ├── collections
│   │    |   ├── requestToPay.ts
│   │    |   ├── requestToPayStatus.ts
│   │    |   ├── account.ts
│   │    |   ├── index.ts
│   │    ├── disbursements
│   │    |   ├── account.ts
│   │    |   ├── index.ts
│   │    |   ├── transfer.ts
│   │    |   ├── transferStatus.ts
│   │    ├── account.ts
│   │    ├── index.ts
│   │    ├── README.md
│   ├── schema      # Contains all schemas
│   │    ├── auth
│   │    |   ├── apiKey.ts
│   │    |   ├── apiUser.ts
│   │    |   ├── token.ts
│   │    ├── collections
│   │    |   ├── requestToPay.ts
│   │    |   ├── requestToPayStatus.ts
│   │    ├── disbursements
│   │    |   ├── transfer.ts
│   │    |   ├── transferStatus.ts
│   │    ├── account.ts
│   ├── utils
│   │    ├── errors.ts
│   │    ├── joi.ts
│   │    ├── readme.ts
│   │    ├── responses.ts
|   ├── index.ts
├── test                           # Contains all tests for the service and fixtures definition
│   ├── mocks
|   |   ├── auth
│   │   |   ├── collections
|   │   │   |   ├── token.ts
│   │   |   ├── disursements
|   │   │   |   ├── token.ts
│   │   |   ├── apiKey.ts
│   │   |   ├── apiUser.ts
│   │   |   ├── index.ts
│   │   |   ├── token.ts
|   |   ├── collections
│   │   |   ├── requestToPay.ts
│   │   |   ├── index.ts
│   │   |   ├── requestToPayStatus.ts
|   |   ├── disbursements
│   │   |   ├── transfer.ts
│   │   |   ├── index.ts
│   │   |   ├── transferStatus.ts
|   |   ├── account.ts
|   |   ├── index.ts
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── CHANGELOG.MD
├── nestjs-cli.json
├── package.json
├── package-lock.json
|── README.md
|── tsconfig.build.json
└── README.json
```

## Installation

### On developemnt using npm

The following environment requires the usage of the following:

1. NodeJS 20.5.1

For installing dependencies `npm` is used. The dependencies used in this project can be found in the _package.json_ file. In order to install them use `npm ci`.

Then run `npm run build`.

### Tests

All tests are collected in the `src/test/` project folder.

### Documentation

Documentation for the project can be generated using the `JSDoc` annotations within the code.
To generate the documentation issue the command `npm docs`.
The docs generated will be available in HTML format in the `.docs/` folder.

## Functions and methods

## Authentication

### createApiUser

- Used to create an API user in the sandbox target environment.

#### Usage

```javascript
import { auth } from './src/index';

const apiUser = auth.createApiUser({
  baseUrl: string, - The remote mtn base url
  referenceId: string, - Format - UUID. Recource ID for the API user to be created. UUID version 4 is required.
  subscriptionKey: string,- The subscription key is used to give access to APIs in the API Manager portal.
  providerCallbackHost: string | null, - The callback host url
});

console.log(apiUser);
```

- This method when triggered makes a call to MTN create api user endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  providerCallbackHost: 'unumed.com',
  referenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
};
const mockResponse = mock.auth.createApiUserSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{
  "statusCode": 201,
  "data": null,
  "message": 'Successfull',
  "requestPayload": {
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  providerCallbackHost: 'unumed.com',
  referenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
  },
}
```

### createApiKey

- Used to create an API key for an API key in the sandbox target environment.

#### Usage

```javascript
import { auth } from './src/index';

const apiKey = auth.createApiKey({
  baseUrl: string, - The remote mtn base url
  referenceId: string, - Format - UUID. Recource ID for the API user to be created. UUID version 4 is required.
  subscriptionKey: string,- The subscription key is used to give access to APIs in the API Manager portal.
  apiUserReferenceId: string, - The same reference id used to create the api user.
});

console.log(apiKey);
```

- This method when triggered makes a call to MTN create api key endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  referenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  apiUserReferenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
};
const mockResponse = mock.auth.createApiKeySuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{
  "statusCode": 201,
  "data": { apikey: '5tt6yjirf67hhjhfdd' },
  "message": 'Successfull',
  "requestPayload": {
   baseUrl: 'https://sandbox.momodeveloper.mtn.com',
   referenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
   apiUserReferenceId: 'eb54164c-d0fa-4f0e-b5ed-b9421a9cf7f7',
   subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
  },
}
```

### createCollectionToken

- This operation is used to create an access token which can then be used to authorize and authenticate towards the other end-points of the collections group.

#### Usage

```javascript
import { auth } from './src/index';

const collectionToken = auth.collection.createToken({
  apiKey: string,  - The generated API key
  apiUserId: string, The generated API user id
  subscriptionKey: string,- The subscription key is used to give access to APIs in the API Manager portal.
  baseUrl: string, - The remote mtn base url
});

console.log(collectionToken);
```

- This method when triggered makes a call to MTN create collection token endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  apiKey: 'bc35f0d89c8a406e821b7febfc3b300f',
  apiUserId: '9ff96246-f861-459f-a8ec-47d200427003',
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
};
const mockResponse = mock.auth.createCollectionTokenSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{
    "statusCode": 200,
    "message": 'Successfull',
    "requestPayload": {
  apiKey: 'bc35f0d89c8a406e821b7febfc3b300f',
  apiUserId: '9ff96246-f861-459f-a8ec-47d200427003',
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
     },
    "data": {
      "accessToken": 'test-token',
      "tokenType": 'Bearer',
      "expiresIn": 300,
    },
}
```

### createDisbursementToken

- This operation is used to create an access token which can then be used to authorize and authenticate towards the other end-points of the disbursements group.

#### Usage

```javascript
import { auth } from './src/index';

const disbursementToken = auth.disbursement.createToken({
  apiKey: string,  - The generated API key
  apiUserId: string, The generated API user id
  subscriptionKey: string,- The subscription key is used to give access to APIs in the API Manager portal.
  baseUrl: string, - The remote mtn base url
});

console.log(disbursementToken);
```

- This method when triggered makes a call to MTN create disbursement token endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  apiKey: 'bc35f0d89c8a406e821b7febfc3b300f',
  apiUserId: '9ff96246-f861-459f-a8ec-47d200427003',
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
};
const mockResponse = mock.auth.createDisbursementTokenSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{
   "statusCode": 200,
    "message": 'Successfull',
    "requestPayload": {
  apiKey: 'bc35f0d89c8a406e821b7febfc3b300f',
  apiUserId: '9ff96246-f861-459f-a8ec-47d200427003',
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
     },
    "data": {
      "accessToken": 'test-token',
      "tokenType": 'Bearer',
      "expiresIn": 300,
    },
}
```

#### POINTS TO NOTE ON AUTHENTICATION

1. The subscription key is used to give access to APIs in the API Manager portal. A user is assigned a subscription Key as and when the user subscribes to products in the API Manager Portal.

2. The API User and API Key are used to grant access to the wallet system in a specific country. API user and Key are wholly managed by the user through Partner Portal.

3. Users are allowed to generate/revoke API Keys through the Partner Portal.

4. However, on Sandbox Environment a Provisioning API is exposed to enable users to generate their own API User and API Key for testing purposes only.

5. The API user and API key are provisioned differently in the sandbox and production environment.

6. In the Sandbox a provisioning API is used to create the API User and API Key, whereas in the production environment the provisioning is done through the User Portal.

## Collections

### validateAccountHolderStatusForCollections

- This is used to check if an account holder is registered and active in the system with collections access token.

#### Usage

```javascript
import { collections } from './src/index';

 const validateAccount = collections.validateAccountHolderStatusForCollections({
    baseUrl: string, - The remote mtn base url
    accountHolderId: string, -The AccountHolder number.Validated according to the AccountHolderID type.eg MSISDN
    bearerToken:string - The generated access token for collections,
    subscriptionKey:string- The subscription key is used to give access to APIs in the API Manager portal. ,
    targetEnvironment: string - The identifier of the Wallet Platform system where the transaction shall be processed.
  })

console.log(validateAccount);
```

- This method when triggered makes a call to MTN validate account holder status endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  accountHolderId: '46733123451',
  accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
  bearerToken: 'test-token',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
  targetEnvironment: 'sandbox',
};
const mockResponse = mock.collections.validateCollectionsAccountHolderStatusSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{,
  "statusCode": 202,
  message: "Successfull",
  "requestPayload": {
    accountHolderId: '46733123451',
    accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
    bearerToken:"test-token",
    subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
    targetEnvironment: 'sandbox',
  }
  "data": {
    result: false,
        },
}
```

### requestToPay

- This operation is used to request a payment from a consumer (Payer). The payer will be asked to authorize the payment. The transaction will be executed once the payer has authorized the payment. The requesttopay will be in status PENDING until the transaction is authorized or declined by the payer or it is timed out by the system.

#### Usage

```javascript
import { collections } from './src/index';

 const requestToPay = collections.requestToPay({
    baseUrl: string, - The remote mtn base url
    accountHolderId: string, -The AccountHolder number.Validated according to the AccountHolderID type.eg MSISDN
    bearerToken:string - The generated access token for collections,
    subscriptionKey:string- The subscription key is used to give access to APIs in the API Manager portal ,
    targetEnvironment: string- The identifier of the Wallet Platform system where the transaction shall be processed.,
    referenceId: string - Format - UUID. Recource ID for the API user to be created. UUID version 4 is required.,
    amount: string - Amount that will be debited from the payer account.,
    currency:string -  ISO4217 Currency,
    payerPartyId: string - Mobile Number validated according to ITU-T E.164. Validated with IsMSISDN,
    payerPartyIdType: string - 'MSISDN' or "EMAIL",
    externalId: string - External id is used as a reference to the transaction. External id is used forreconciliation.,
    payeeNote: string - Message that will be written in the payee transaction history note field.,
    payerMessage: Message that will be written in the payer transaction history message field.,
  })

console.log(requestToPay);
```

- This method when triggered makes a call to MTN request to pay endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
  amount: '500',
  currency: 'EUR',
  payerPartyId: '46733123453',
  payerPartyIdType: 'MSISDN',
  externalId: 'external-id',
  payeeNote: 'This is a note',
  payerMessage: 'This is a message',
};
const mockResponse = mock.collections.requestToPaySuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{,
  "statusCode": 202,
  message: "Successfull",
  "requestPayload": {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
  amount: '500',
  currency: 'EUR',
  payerPartyId: '46733123453',
  payerPartyIdType: 'MSISDN',
  externalId: 'external-id',
  payeeNote: 'This is a note',
  payerMessage: 'This is a message',
  }
  "data": {},
}
```

### requestToPayStatus

- This operation is used to get the status of a request to pay. ReferenceId that was passed in the post is used as reference to the request.

#### Usage

```javascript
import { collections } from './src/index';

 const requestToPayStatus = collections.requestToPayStatus({
    baseUrl: string, - The remote mtn base url
    bearerToken:string - The generated access token for collections,
    subscriptionKey:string- The subscription key is used to give access to APIs in the API Manager portal ,
    targetEnvironment: string- The identifier of the Wallet Platform system where the transaction shall be processed.,
    requestToPayReferenceId: string - The same reference that was used in the request to pay transaction.
  })

console.log(requestToPayStatus);
```

- This method when triggered makes a call to MTN request to pay status endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  requestToPayReferenceId: '9ff96246-f861-459f-a8ec-47d200427003',
};
const mockResponse = mock.collections.requestToPayStatusSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{,
  "statusCode": 200,
  message: "Successfull",
  "requestPayload": {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  requestToPayReferenceId: '9ff96246-f861-459f-a8ec-47d200427003',
  }
  "data": {
  externalId: 'test-external-Id',
  amount: '500',
  currency: 'EURO',
  payer: {
    partyIdType: PartyIdTypeEnum.MSISDN,
    partyId: '544413229',
  },
  payerMessage: 'This is a message',
  payeeNote: 'This is a note',
  status: "SUCCESSFULL",
  financialTransactionId: 'test',
  },
}
```

## Disbursements

### validateAccountHolderStatusForDisbursements

- This is used to check if an account holder is registered and active in the system with collections access token.

#### Usage

```javascript
import { collections } from './src/index';

 const validateAccount = collections.validateAccountHolderStatusForCollections({
    baseUrl: string, - The remote mtn base url
    accountHolderId: string, -The AccountHolder number.Validated according to the AccountHolderID type.eg MSISDN
    bearerToken:string - The generated access token for collections,
    subscriptionKey:string- The subscription key is used to give access to APIs in the API Manager portal. ,
    targetEnvironment: string - The identifier of the Wallet Platform system where the transaction shall be processed.
  })

console.log(validateAccount);
```

- This method when triggered makes a call to MTN validate account holder status endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  accountHolderId: '46733123451',
  accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
  bearerToken: 'test-token',
  subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
  targetEnvironment: 'sandbox',
};
const mockResponse = mock.collections.validateCollectionsAccountHolderStatusSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{,
  "statusCode": 202,
  message: "Successfull",
  "requestPayload": {
    accountHolderId: '46733123451',
    accountHolderIdType: AccountHolderIdTypeEnum.msisdn,
    bearerToken:"test-token",
    subscriptionKey: 'fb127b0faea742498dd40d88456def2f',
    targetEnvironment: 'sandbox',
  }
  "data": {
    result: true,
        },
}
```

### Transfer

- Transfer operation is used to transfer an amount from the own account to a payee account.
  Status of the transaction can validated by using the GET /transfer/{referenceId}

#### Usage

```javascript
import { disbursements } from './src/index';

 const transfer = disbursements.transfer({
    baseUrl: string, - The remote mtn base url
    accountHolderId: string, -The AccountHolder number.Validated according to the AccountHolderID type.eg MSISDN
    bearerToken:string - The generated access token for collections,
    subscriptionKey:string- The subscription key is used to give access to APIs in the API Manager portal ,
    targetEnvironment: string- The identifier of the Wallet Platform system where the transaction shall be processed.,
    referenceId: string - Format - UUID. Recource ID for the API user to be created. UUID version 4 is required.,
    amount: string - Amount that will be debited from the payer account.,
    currency:string -  ISO4217 Currency,
    payeePartyId: string - Mobile Number validated according to ITU-T E.164. Validated with IsMSISDN,
    payeePartyIdType: string - 'MSISDN' or "EMAIL",
    externalId: string - External id is used as a reference to the transaction. External id is used forreconciliation.,
    payeeNote: string - Message that will be written in the payee transaction history note field.,
    payerMessage: Message that will be written in the payer transaction history message field.,
  })

console.log(transfer);
```

- This method when triggered makes a call to MTN transfer endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
  amount: '500',
  currency: 'EUR',
  payeePartyId: '46733123453',
  payeePartyIdType: 'MSISDN',
  externalId: 'external-id',
  payeeNote: 'This is a note',
  payerMessage: 'This is a message',
};
const mockResponse = mock.disbursements.transferSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{,
  "statusCode": 202,
  message: "Successfull",
  "requestPayload": {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
  amount: '500',
  currency: 'EUR',
  payeePartyId: '46733123453',
  payeePartyIdType: 'MSISDN',
  externalId: 'external-id',
  payeeNote: 'This is a note',
  payerMessage: 'This is a message',
  }
  "data": {},
}
```

### Transfer Status

-This operation is used to get the status of a transfer. ReferenceId that was passed in the post is used as reference to the request.

#### Usage

```javascript
import { disbursements } from './src/index';

 const transferStatus = disbursements.transferStatus({
    baseUrl: string, - The remote mtn base url
    bearerToken:string - The generated access token for collections,
    subscriptionKey:string- The subscription key is used to give access to APIs in the API Manager portal ,
    targetEnvironment: string- The identifier of the Wallet Platform system where the transaction shall be processed.,
    transferReferenceId: string - The same reference that was used in the transfer transaction.
  })

console.log(transferStatus);
```

- This method when triggered makes a call to MTN transfer status endpoint

#### Mock response body

```javascript
import { mock } from './src/index';

const requestPayload = {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  transferReferenceId: '9ff96246-f861-459f-a8ec-47d200427003',
};
const mockResponse = mock.disbursements.transferStatusSuccessResponse(requestPayload);
```

#### Sample Response

```javascript
{,
  "statusCode": 202,
  message: "Successfull",
  "requestPayload": {
  subscriptionKey: '9ff96246-f861-459f-a8ec-47d200427003',
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  bearerToken: 'jgdugddgydgdygdygdygdgydgydgyd',
  targetEnvironment: 'sandbox',
  referenceId: '9ff96246-f861-459f-a8ec-47d200427003',
  amount: '500',
  currency: 'EUR',
  payeePartyId: '46733123453',
  payeePartyIdType: 'MSISDN',
  externalId: 'external-id',
  payeeNote: 'This is a note',
  payerMessage: 'This is a message',
  }
  "data": {},
}
```
