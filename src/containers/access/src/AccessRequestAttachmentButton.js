// @flow
import { useState } from 'react';

import { faPaperclip } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from 'lattice-ui-kit';
import type { UUID } from 'lattice';

import AttachmentsModal from './AttachmentsModal';

type Props = {
  accessRequestId :UUID;
};

const AccessRequestAttachmentButton = ({ accessRequestId } :Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenAttachments = () => {
    setMenuOpen(true);
  };

  const handleCloseAttachments = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <IconButton
          aria-controls={menuOpen ? 'access-request-attachment-menu' : undefined}
          aria-expanded={menuOpen ? 'true' : undefined}
          aria-haspopup="menu"
          aria-label="access request attachment button">
        <FontAwesomeIcon fixedWidth icon={faPaperclip} onClick={handleOpenAttachments} />
      </IconButton>
      <AttachmentsModal
          accessRequestId={accessRequestId}
          isVisible={menuOpen}
          onClose={handleCloseAttachments} />
    </>
  );
};

export default AccessRequestAttachmentButton;
