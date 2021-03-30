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
  UPDATE_ACCESS_REQUEST,
  updateAccessRequest,
} from '../actions';

const { updateEntityData } = DataApiActions;
const { updateEntityDataWorker } = DataApiSagas;
const { UpdateTypes } = Types;

const { ACCESS_REQUEST_SUBMISSION } = AppTypes;
const { FORM_DATA } = PropertyTypes;

const LOG = new Logger('updateAccessRequest');

function* updateAccessRequestWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;
  try {
    const { value } = action;
    if (!isPlainObject(value)) throw ERR_ACTION_VALUE_TYPE;
    const { formData, entityKeyId } = value;
    const formDataStr = JSON.stringify(formData);
    yield put(updateAccessRequest.request(action.id, {
      path: ['accessRequest', FORM_DATA.toString(), 0],
      formData: formDataStr
    }));

    const config = yield select(selectAppConfig());
    const entitySetId = getESIDFromConfig(config, ACCESS_REQUEST_SUBMISSION);

    const propertyTypesByFQN = yield select(selectPropertyTypeIDsByFQN([FORM_DATA]));

    const formDataPTID = propertyTypesByFQN.get(FORM_DATA);

    const entities = {
      [entityKeyId]: {
        [formDataPTID]: [formDataStr],
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

    yield put(updateAccessRequest.success(action.id));

  }
  catch (error) {
    response = { error };
    LOG.error(action.type, error);
    yield put(updateAccessRequest.failure(action.id, error));
  }
  finally {
    yield put(updateAccessRequest.finally(action.id));
  }
  return response;
}

function* updateAccessRequestWatcher() :Saga<void> {
  yield takeEvery(UPDATE_ACCESS_REQUEST, updateAccessRequestWorker);
}

export {
  updateAccessRequestWatcher,
  updateAccessRequestWorker,
};
