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

import SelectTags from './SelectTags';
import { ItemTextWrapper } from './styled';

import {
  DOCX_MIME_TYPE,
  PDF_MIME_TYPE,
} from '../../../constants/FileTypeConstants';

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
  onDelete :Function;
  onTagChange :Function;
  tag :string;
}

const ImagePreview = styled.img`
  max-height: 40px;
  max-width: 40px;
`;

const DocumentItem = ({
  divider,
  file,
  index,
  onDelete,
  onTagChange,
  tag,
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
      <ItemTextWrapper>
        <ListItemText primary={name} />
        <SelectTags index={index} onTagChange={onTagChange} value={tag} />
      </ItemTextWrapper>

      <ListItemSecondaryAction>
        <IconButton aria-label="Remove" onClick={handleDelete} title="Remove">
          <FontAwesomeIcon fixedWidth icon={faTrashAlt} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DocumentItem;
