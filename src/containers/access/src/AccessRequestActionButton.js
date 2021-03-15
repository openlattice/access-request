// @flow
import { useReducer, useRef } from 'react';

import { faEllipsisV } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton,
  // $FlowFixMe
  Menu,
  // $FlowFixMe
  MenuItem
} from 'lattice-ui-kit';
import type { UUID } from 'lattice';

import AttachmentsModal from './AttachmentsModal';

const CLOSE_ATTACHMENTS = 'CLOSE_ATTACHMENTS';
const CLOSE_MENU = 'CLOSE_MENU';
const OPEN_ATTACHMENTS = 'OPEN_ATTACHMENTS';
const OPEN_MENU = 'OPEN_MENU';

const INITIAL_STATE :{|
  attachmentsOpen :boolean;
  menuOpen :boolean;
|} = {
  attachmentsOpen: false,
  menuOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case CLOSE_MENU:
      return {
        ...state,
        menuOpen: false,
      };
    case OPEN_MENU:
      return {
        ...state,
        menuOpen: true,
      };
    case CLOSE_ATTACHMENTS:
      return {
        ...state,
        attachmentsOpen: false,
      };
    case OPEN_ATTACHMENTS:
      return {
        ...state,
        attachmentsOpen: true,
        menuOpen: false,
      };
    default:
      return state;
  }
};

type Props = {
  accessRequestId :UUID;
  onPrint :Function;
};

const AccessRequestActionButton = ({
  accessRequestId,
  onPrint
} :Props) => {
  const [state, stateDispatch] = useReducer(reducer, INITIAL_STATE);
  const anchorRef = useRef(null);

  const handleOpenMenu = () => {
    stateDispatch({ type: OPEN_MENU });
  };

  const handleCloseMenu = () => {
    stateDispatch({ type: CLOSE_MENU });
  };

  const handleOpenAttachments = () => {
    stateDispatch({ type: OPEN_ATTACHMENTS });
  };

  const handleCloseAttachments = () => {
    stateDispatch({ type: CLOSE_ATTACHMENTS });
  };

  return (
    <>
      <IconButton
          aria-controls={state.menuOpen ? 'access-request-action-menu' : undefined}
          aria-expanded={state.menuOpen ? 'true' : undefined}
          aria-haspopup="menu"
          aria-label="access request action button"
          onClick={handleOpenMenu}
          ref={anchorRef}
          variant="text">
        <FontAwesomeIcon fixedWidth icon={faEllipsisV} />
      </IconButton>
      <Menu
          anchorEl={anchorRef.current}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          elevation={4}
          getContentAnchorEl={null}
          id="access-request-action-menu"
          onClose={handleCloseMenu}
          open={state.menuOpen}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}>
        <MenuItem onClick={onPrint}>Print</MenuItem>
        <MenuItem onClick={handleOpenAttachments}>Manage Attachments</MenuItem>
      </Menu>
      <AttachmentsModal
          accessRequestId={accessRequestId}
          isVisible={state.attachmentsOpen}
          onClose={handleCloseAttachments} />
    </>
  );
};

export default AccessRequestActionButton;
