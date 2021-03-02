// @flow
import isPlainObject from 'lodash/isPlainObject';
import {
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { Map } from 'immutable';
import { Constants } from 'lattice';
import {
  DataApiActions,
  DataApiSagas,
} from 'lattice-sagas';
import { Logger } from 'lattice-utils';
import { DateTime } from 'luxon';
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { AppTypes, PropertyTypes } from '../../../../core/edm/constants';
import { selectPropertyTypeIDsByFQN } from '../../../../core/redux/selectors';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import { APP_PATHS } from '../../../app';
import {
  SUBMIT_ACCESS_REQUEST,
  submitAccessRequest,
} from '../actions';

const { OPENLATTICE_ID_FQN } = Constants;
const { createOrMergeEntityData } = DataApiActions;
const { createOrMergeEntityDataWorker } = DataApiSagas;

const { ACCESS_REQUEST_SUBMISSION } = AppTypes;
const {
  FORM_DATA,
  REQUEST_DATE_TIME,
  RJSF_JSON_SCHEMA,
  RJSF_UI_SCHEMA,
  TYPE,
} = PropertyTypes;

const LOG = new Logger('submitAccessRequestSagas');

function* submitAccessRequestWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;
  try {
    const { value } = action;
    if (!isPlainObject(value)) throw ERR_ACTION_VALUE_TYPE;
    yield put(submitAccessRequest.request(action.id));

    const config = yield select((store) => store.getIn(APP_PATHS.APP_CONFIG));
    const entitySetId = getESIDFromConfig(config, ACCESS_REQUEST_SUBMISSION);

    const {
      formData,
      schema,
      uiSchema,
      type
    } = value;

    const propertyTypesByFQN = yield select(selectPropertyTypeIDsByFQN([
      FORM_DATA,
      REQUEST_DATE_TIME,
      RJSF_JSON_SCHEMA,
      RJSF_UI_SCHEMA,
      TYPE,
    ]));

    const formDataPTID = propertyTypesByFQN.get(FORM_DATA);
    const requestDatetimePTID = propertyTypesByFQN.get(REQUEST_DATE_TIME);
    const rjsfJsonSchemaPTID = propertyTypesByFQN.get(RJSF_JSON_SCHEMA);
    const rjsfUiSchemaPTID = propertyTypesByFQN.get(RJSF_UI_SCHEMA);
    const typePTID = propertyTypesByFQN.get(TYPE);

    const formDataStr = JSON.stringify(formData);
    const schemaStr = JSON.stringify(schema);
    const uiSchemaStr = JSON.stringify(uiSchema);

    const now = DateTime.local().toISO();
    const entityData = [{
      [typePTID]: [type || 'Common Application'],
      [formDataPTID]: [formDataStr],
      [rjsfJsonSchemaPTID]: [schemaStr],
      [rjsfUiSchemaPTID]: [uiSchemaStr],
      [requestDatetimePTID]: [now]
    }];

    const submitAccessResponse = yield call(
      createOrMergeEntityDataWorker,
      createOrMergeEntityData({ entitySetId, entityData })
    );

    if (submitAccessResponse.error) throw submitAccessResponse.error;
    const localEntity = Map({
      [TYPE]: [type || 'Common Application'],
      [FORM_DATA]: [formDataStr],
      [RJSF_JSON_SCHEMA]: [schemaStr],
      [RJSF_UI_SCHEMA]: [uiSchemaStr],
      [REQUEST_DATE_TIME]: [now],
      [OPENLATTICE_ID_FQN]: submitAccessResponse.data
    });
    response = { data: localEntity };
    debugger;

    yield put(submitAccessRequest.success(action.id, response.data));

  }
  catch (error) {
    response = { error };
    LOG.error(action.type, error);
    yield put(submitAccessRequest.failure(action.id, error));
  }
  finally {
    yield put(submitAccessRequest.finally(action.id));
  }
  return response;
}

function* submitAccessRequestWatcher() :Saga<void> {
  yield takeEvery(SUBMIT_ACCESS_REQUEST, submitAccessRequestWorker);
}

export {
  submitAccessRequestWatcher,
  submitAccessRequestWorker,
};
