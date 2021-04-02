// @flow
import isPlainObject from 'lodash/isPlainObject';
import {
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { Types } from 'lattice';
import {
  DataApiActions,
  DataApiSagas,
} from 'lattice-sagas';
import { Logger } from 'lattice-utils';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { AppTypes, PropertyTypes } from '../../../../core/edm/constants';
import { selectAppConfig, selectPropertyTypeIDsByFQN } from '../../../../core/redux/selectors';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import {
  UPDATE_ATTACHMENT_TAG,
  updateAttachmentTag,
} from '../actions';
import { ATTACHMENTS } from '../reducers/constants';

const { updateEntityData } = DataApiActions;
const { updateEntityDataWorker } = DataApiSagas;
const { UpdateTypes } = Types;

const { FILE } = AppTypes;
const { LABEL } = PropertyTypes;

const LOG = new Logger('updateAttachmentTag');

function* updateAttachmentTagWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;
  try {
    const { value } = action;
    if (!isPlainObject(value)) throw ERR_ACTION_VALUE_TYPE;
    const { tag, entityKeyId } = value;
    yield put(updateAttachmentTag.request(action.id, {
      path: [ATTACHMENTS, entityKeyId, LABEL.toString(), 0],
      tag,
    }));

    const config = yield select(selectAppConfig());
    const entitySetId = getESIDFromConfig(config, FILE);

    const propertyTypesByFQN = yield select(selectPropertyTypeIDsByFQN([LABEL]));

    const tagPTID = propertyTypesByFQN.get(LABEL);

    const entities = {
      [entityKeyId]: {
        [tagPTID]: [tag],
      },
    };

    const updateAccessResponse = yield call(
      updateEntityDataWorker,
      updateEntityData({
        entitySetId,
        entities,
        updateType: UpdateTypes.PartialReplace,
      }),
    );

    if (updateAccessResponse.error) throw updateAccessResponse.error;
    response = { data: updateAccessResponse.data };

    yield put(updateAttachmentTag.success(action.id));

  }
  catch (error) {
    response = { error };
    LOG.error(action.type, error);
    yield put(updateAttachmentTag.failure(action.id, error));
  }
  finally {
    yield put(updateAttachmentTag.finally(action.id));
  }
  return response;
}

function* updateAttachmentTagWatcher() :Saga<void> {
  yield takeEvery(UPDATE_ATTACHMENT_TAG, updateAttachmentTagWorker);
}

export {
  updateAttachmentTagWatcher,
  updateAttachmentTagWorker,
};
