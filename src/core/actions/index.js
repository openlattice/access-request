// @flow

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const DELETE_BULK_ENTITIES :'DELETE_BULK_ENTITIES' = 'DELETE_BULK_ENTITIES';
const deleteBulkEntities :RequestSequence = newRequestSequence(DELETE_BULK_ENTITIES);

export {
  DELETE_BULK_ENTITIES,
  deleteBulkEntities,
};
