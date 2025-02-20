import { auth, collections, disbursements } from './modules';
import { auth as mockAuth, collections as mockCollections, disbursements as mockDisbursments } from '../test/mocks';

const mock = {
  auth: mockAuth,
  collections: mockCollections,
  disbursements: mockDisbursments,
};

export { auth, collections, mock, disbursements };

export default {
  auth,
  collections,
  mock,
  disbursements,
};
