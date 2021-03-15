// @flow

import styled from 'styled-components';
import {
  faFilePdf,
  faFileWord,
} from '@fortawesome/pro-light-svg-icons';
import {
  faTrashAlt,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

import {
  DOCX_MIME_TYPE,
  PDF_MIME_TYPE,
} from '../../constants/FileTypeConstants';

const MIME_TYPES_TO_ICONS = {
  [PDF_MIME_TYPE]: faFilePdf,
  [DOCX_MIME_TYPE]: faFileWord,
};

type Props = {
  divider :boolean;
  file :{
    name :string;
    type :string;
    base64 :string;
  };
  index :number;
  onDelete :Function
}

const ImagePreview = styled.img`
  max-height: 40px;
  max-width: 40px;
`;

const DocumentItem = ({
  divider,
  file,
  index,
  onDelete
} :Props) => {

  const handleDelete = () => {
    onDelete(index);
  };

  const { name, type, base64 } = file;

  let icon;
  Object.entries(MIME_TYPES_TO_ICONS).forEach(([prefix, fileTypeIcon]) => {
    if (type.startsWith(prefix)) {
      icon = fileTypeIcon;
    }
  });
  const imagePreview = icon ? <FontAwesomeIcon fixedWidth icon={icon} size="2x" /> : <ImagePreview src={base64} />;

  return (
    <ListItem divider={divider}>
      <ListItemAvatar>
        {imagePreview}
      </ListItemAvatar>
      <ListItemText primary={name} />

      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <FontAwesomeIcon fixedWidth icon={faTrashAlt} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DocumentItem;
