// @flow
import { useState } from 'react';

import styled from 'styled-components';
import {
  faFilePdf,
  faFileWord,
} from '@fortawesome/pro-light-svg-icons';
import {
  faDownload,
  faPen,
  faTimes,
  faTrashAlt,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map } from 'immutable';
import {
  IconButton,
  // $FlowFixMe
  ListItem,
  // $FlowFixMe
  ListItemAvatar,
  // $FlowFixMe
  ListItemSecondaryAction,
  // $FlowFixMe
  ListItemText,
  Tag,
} from 'lattice-ui-kit';
import { DataUtils } from 'lattice-utils';
import { DateTime } from 'luxon';

import SelectTags from './SelectTags';
import { updateAttachmentTag } from './actions';
import { ItemTextWrapper } from './styled';

import {
  DOCX_MIME_TYPE,
  PDF_MIME_TYPE,
} from '../../../constants/FileTypeConstants';
import { PropertyTypes } from '../../../core/edm/constants';
import { useDispatch } from '../../../core/redux';

const MIME_TYPES_TO_ICONS = {
  [PDF_MIME_TYPE]: faFilePdf,
  [DOCX_MIME_TYPE]: faFileWord,
};

const { getEntityKeyId, getPropertyValue } = DataUtils;
const {
  DATE_TIME,
  FILE_DATA,
  LABEL,
  NAME,
  TYPE,
} = PropertyTypes;

type Props = {
  divider :boolean;
  file :Map;
  onDelete :Function
}

const ImagePreview = styled.img`
  max-height: 40px;
  max-width: 40px;
`;

type SecondaryTextProps = {
  date :string;
  tag :string;
};

const SecondaryText = ({ date, tag } :SecondaryTextProps) => (
  <>
    {date}
    { tag && (
      <Tag mode="secondary">{tag}</Tag>
    )}
  </>
);

const AttachmentItem = ({
  divider,
  file,
  onDelete
} :Props) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const dateTime = getPropertyValue(file, [DATE_TIME, 0]);
  const dateStr = DateTime.fromISO(dateTime).toLocaleString(DateTime.DATE_SHORT);
  const fileData = getPropertyValue(file, [FILE_DATA, 0]);
  const fileId = getEntityKeyId(file);
  const name = getPropertyValue(file, [NAME, 0]);
  const tag = getPropertyValue(file, [LABEL, 0]);
  const type = getPropertyValue(file, [TYPE, 0]);

  let icon;
  Object.entries(MIME_TYPES_TO_ICONS).forEach(([prefix, fileTypeIcon]) => {
    if (type.startsWith(prefix)) {
      icon = fileTypeIcon;
    }
  });
  const imagePreview = icon ? <FontAwesomeIcon fixedWidth icon={icon} size="2x" /> : <ImagePreview src={fileData} />;

  const handleDelete = () => {
    onDelete(fileId);
  };

  const handleEditTag = () => {
    setEditing(!editing);
  };

  const onTagChange = (entityKeyId, value = '') => {
    dispatch(updateAttachmentTag({ entityKeyId, tag: value }));
    setEditing(false);
  };

  return (
    <ListItem divider={divider}>
      <ListItemAvatar>
        {imagePreview}
      </ListItemAvatar>
      <ItemTextWrapper paddingRight="96px">
        <ListItemText
            primary={name}
            secondary={!editing ? <SecondaryText date={dateStr} tag={tag} /> : null} />
        { editing && (
          <SelectTags index={fileId} onTagChange={onTagChange} value={tag} />
        )}
      </ItemTextWrapper>
      <ListItemSecondaryAction>
        <IconButton aria-label="Edit Tag" onClick={handleEditTag} title="Edit Tag">
          <FontAwesomeIcon fixedWidth icon={editing ? faTimes : faPen} />
        </IconButton>
        <a
            aria-label="Download"
            download
            href={fileData}
            rel="noreferrer"
            target="_blank"
            title="Download">
          <IconButton>
            <FontAwesomeIcon icon={faDownload} fixedWidth />
          </IconButton>
        </a>
        <IconButton aria-label="Delete" onClick={handleDelete} title="Delete">
          <FontAwesomeIcon fixedWidth icon={faTrashAlt} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default AttachmentItem;
