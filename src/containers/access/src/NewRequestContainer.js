// @flow
import { useEffect } from 'react';

import { GET_FORMS, getForms } from './actions';

import CommonApplicationForm from '../../../forms/common/CommonApplicationForm';
import { useDispatch } from '../../../core/redux';
import { resetRequestState } from '../../../core/redux/actions';

const NewRequestContainer = () => {
  // fetch common application form template from app.form entity set
  // parse as JSON an dpass to CommonApplicationForm as props
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForms());

    return () => dispatch(resetRequestState([GET_FORMS]));
  });

  return <CommonApplicationForm />;
};

export default NewRequestContainer;
