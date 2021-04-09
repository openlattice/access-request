// @flow
import { useEffect } from 'react';

// $FlowFixMe
import { List } from 'lattice-ui-kit';
import { DataUtils } from 'lattice-utils';
import type { UUID } from 'lattice';

import AttachmentItem from './AttachmentItem';
import { deleteAttachments, getAttachments } from './actions';

import { useDispatch, useSelector } from '../../../core/redux';
import { selectAttachments } from '../../../core/redux/selectors';

const { getEntityKeyId } = DataUtils;
type Props = {
  accessRequestId :UUID;
};

const ManageAttachmentsContainer = ({ accessRequestId } :Props) => {
  const attachments = useSelector(selectAttachments());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttachments(accessRequestId));
  }, [accessRequestId, dispatch]);

  const onDelete = (fileId) => {
    dispatch(deleteAttachments([fileId]));
  };

  return (
    <List>
      {
        attachments.valueSeq().map((file, index) => {
          const fileId = getEntityKeyId(file);
          const divider = index !== attachments.size - 1;

          return (
            <AttachmentItem
                divider={divider}
                file={file}
                key={fileId}
                onDelete={onDelete} />
          );
        })
      }
    </List>
  );
};

export default ManageAttachmentsContainer;
