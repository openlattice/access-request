// @flow
import styled from 'styled-components';
import {
  faFilePdf,
  faFileWord,
} from '@fortawesome/pro-light-svg-icons';
import {
  faDownload,
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
} from 'lattice-ui-kit';
import { DataUtils } from 'lattice-utils';
import { DateTime } from 'luxon';

import {
  DOCX_MIME_TYPE,
  PDF_MIME_TYPE,
} from '../../../constants/FileTypeConstants';
import { PropertyTypes } from '../../../core/edm/constants';

const MIME_TYPES_TO_ICONS = {
  [PDF_MIME_TYPE]: faFilePdf,
  [DOCX_MIME_TYPE]: faFileWord,
};

const { getEntityKeyId, getPropertyValue } = DataUtils;
const {
  DATE_TIME,
  FILE_DATA,
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

const AttachmentItem = ({
  divider,
  file,
  onDelete
} :Props) => {

  const fileId = getEntityKeyId(file);
  const name = getPropertyValue(file, [NAME, 0]);
  const type = getPropertyValue(file, [TYPE, 0]);
  const fileData = getPropertyValue(file, [FILE_DATA, 0]);
  const dateTime = getPropertyValue(file, [DATE_TIME, 0]);
  const dateStr = DateTime.fromISO(dateTime).toLocaleString(DateTime.DATE_SHORT);

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

  return (
    <ListItem divider={divider}>
      <ListItemAvatar>
        {imagePreview}
      </ListItemAvatar>
      <ListItemText primary={name} secondary={dateStr} />

      <ListItemSecondaryAction>
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