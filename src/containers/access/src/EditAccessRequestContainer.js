// @flow
import { useEffect } from 'react';

import AccessRequestEditor from './AccessRequestEditor';
import { clearAccessRequest } from './actions';

import { useDispatch, useSelector } from '../../../core/redux';
import { selectAccessRequestData } from '../../../core/redux/selectors';

const EditAccessRequestContainer = () => {
  const data = useSelector(selectAccessRequestData());
  const dispatch = useDispatch();
  useEffect(() => () => dispatch(clearAccessRequest()));

  return <AccessRequestEditor data={data} />;
};

export default EditAccessRequestContainer;
