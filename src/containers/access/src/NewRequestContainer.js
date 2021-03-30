// @flow
import { useEffect } from 'react';

import { Spinner } from 'lattice-ui-kit';
import { DataUtils, ReduxUtils } from 'lattice-utils';

import { GET_FORMS, getForms } from './actions';
import { CenterWrapper } from './styled';

import CommonApplicationForm from '../../../forms/common/CommonApplicationForm';
import { PropertyTypes } from '../../../core/edm/constants';
import { useDispatch, useSelector } from '../../../core/redux';
import { resetRequestState } from '../../../core/redux/actions';
import { ACCESS, REQUEST_STATE } from '../../../core/redux/constants';
import { selectAccessRequestForms } from '../../../core/redux/selectors';

const { getPropertyValue } = DataUtils;
const { RJSF_JSON_SCHEMA, RJSF_UI_SCHEMA } = PropertyTypes;
const {
  isFailure,
  isPending,
  isStandby,
} = ReduxUtils;

const NewRequestContainer = () => {
  const dispatch = useDispatch();
  const fetchState = useSelector((store) => store.getIn([ACCESS, GET_FORMS, REQUEST_STATE]));
  const forms = useSelector(selectAccessRequestForms());

  useEffect(() => {
    dispatch(getForms());

    return () => dispatch(resetRequestState([GET_FORMS]));
  }, [dispatch]);

  if (isPending(fetchState) || isStandby(fetchState)) {
    return <CenterWrapper><Spinner size="2x" /></CenterWrapper>;
  }
  if (isFailure(fetchState)) {
    return (<div>An error has occurred in fetching the form template. Please contact support.</div>);
  }

  try {
    const form = forms.first();
    const schemasStr = getPropertyValue(form, [RJSF_JSON_SCHEMA, 0]);
    const uiSchemasStr = getPropertyValue(form, [RJSF_UI_SCHEMA, 0]);
    const schemas = JSON.parse(schemasStr);
    const uiSchemas = JSON.parse(uiSchemasStr);
    return <CommonApplicationForm schemas={schemas} uiSchemas={uiSchemas} />;
  }
  catch (error) {
    return (<div>An error has occured in parsing the form template. Please contact support.</div>);
  }
};

export default NewRequestContainer;
