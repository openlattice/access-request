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
import type { Saga } from '@redux-saga/core';
import type { WorkerResponse } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

import getESIDFromConfig from '../../../../utils/getESIDFromConfig';
import { AppTypes, PropertyTypes } from '../../../../core/edm/constants';
import { selectAppConfig, selectPropertyTypeIDsByFQN } from '../../../../core/redux/selectors';
import { ERR_ACTION_VALUE_TYPE } from '../../../../utils/Errors';
import {
  SAVE_NEW_FORM_TEMPLATE,
  saveNewFormTemplate,
} from '../actions';

const { createOrMergeEntityData } = DataApiActions;
const { createOrMergeEntityDataWorker } = DataApiSagas;

const { FORM } = AppTypes;
const {
  RJSF_JSON_SCHEMA,
  RJSF_UI_SCHEMA,
  TYPE,
} = PropertyTypes;

const LOG = new Logger('saveNewFormTemplateSagas');

function* saveNewFormTemplateWorker(action :SequenceAction) :Saga<WorkerResponse> {
  let response;
  try {
    const { value } = action;
    if (!isPlainObject(value)) throw ERR_ACTION_VALUE_TYPE;
    yield put(saveNewFormTemplate.request(action.id));

    const config = yield select(selectAppConfig());
    const entitySetId = getESIDFromConfig(config, FORM);

    const {
      schema,
      uiSchema,
      type
    } = value;

    const propertyTypesByFQN = yield select(selectPropertyTypeIDsByFQN([
      RJSF_JSON_SCHEMA,
      RJSF_UI_SCHEMA,
      TYPE,
    ]));

    const rjsfJsonSchemaPTID = propertyTypesByFQN.get(RJSF_JSON_SCHEMA);
    const rjsfUiSchemaPTID = propertyTypesByFQN.get(RJSF_UI_SCHEMA);
    const typePTID = propertyTypesByFQN.get(TYPE);

    const schemaStr = JSON.stringify(schema);
    const uiSchemaStr = JSON.stringify(uiSchema);

    const entityData = [{
      [typePTID]: [type || 'Common Application'],
      [rjsfJsonSchemaPTID]: [schemaStr],
      [rjsfUiSchemaPTID]: [uiSchemaStr],
    }];

    const saveNewTemplateResponse = yield call(
      createOrMergeEntityDataWorker,
      createOrMergeEntityData({ entitySetId, entityData })
    );

    if (saveNewTemplateResponse.error) throw saveNewTemplateResponse.error;

    response = saveNewTemplateResponse;

    yield put(saveNewFormTemplate.success(action.id));

  }
  catch (error) {
    response = { error };
    LOG.error(action.type, error);
    yield put(saveNewFormTemplate.failure(action.id, error));
  }
  finally {
    yield put(saveNewFormTemplate.finally(action.id));
  }
  return response;
}

function* saveNewFormTemplateWatcher() :Saga<void> {
  yield takeEvery(SAVE_NEW_FORM_TEMPLATE, saveNewFormTemplateWorker);
}

export {
  saveNewFormTemplateWatcher,
  saveNewFormTemplateWorker,
};
