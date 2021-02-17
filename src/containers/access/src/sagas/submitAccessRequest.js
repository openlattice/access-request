// @flow
import isPlainObject from 'lodash/isPlainObject';
import {
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import {
  DataApiActions,
  DataApiSagas,
} from 'lattice-sagas';
import { Logger } from 'lattice-utils';
import { DateTime } from 'luxon';
import type { Saga } from '@redux-saga/core';
import type { SequenceAction } from 'redux-reqseq';

import { AppTypes, PropertyTypes } from '../../../../core/edm/constants';
import { selectPropertyTypeIDsByFQN } from '../../../../core/redux/selectors';
import { getESIDFromConfig } from '../../../../utils/AppUtils';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import { APP_PATHS } from '../../../app';
import {
  SUBMIT_ACCESS_REQUEST,
  submitAccessRequest,
} from '../actions';

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

function* submitAccessRequestWorker(action :SequenceAction) :Saga<void> {
  const response :Object = {};
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

    const now = DateTime.local().toISO();
    const entityData = [{
      // type
      [typePTID]: [type || 'Common Application'],
      // // formdata
      [formDataPTID]: [JSON.stringify(formData)],
      // // schema
      [rjsfJsonSchemaPTID]: [JSON.stringify(schema)],
      // // uischema
      [rjsfUiSchemaPTID]: [JSON.stringify(uiSchema)],
      // // request date time
      [requestDatetimePTID]: [now]
    }];

    const submitAccessResponse = yield call(
      createOrMergeEntityDataWorker,
      createOrMergeEntityData({ entitySetId, entityData })
    );

    if (submitAccessResponse.error) throw submitAccessResponse.error;

    yield put(submitAccessRequest.success(action.id));

  }
  catch (error) {
    response.error = error;
    LOG.error(action.type, error);
    yield put(submitAccessRequest.failure(action.id, error));
  }
  finally {
    yield put(submitAccessRequest.finally(action.id));
  }
  return response;
}

function* submitAccessRequestWatcher() :Generator<any, any, any> {
  yield takeEvery(SUBMIT_ACCESS_REQUEST, submitAccessRequestWorker);
}

export {
  submitAccessRequestWatcher,
  submitAccessRequestWorker,
};
