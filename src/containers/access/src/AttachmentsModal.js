// @flow
import { Modal } from 'lattice-ui-kit';
import type { UUID } from 'lattice';

import AttachmentsBody from './AttachmentsBody';

type Props = {
  accessRequestId :UUID;
  isVisible :boolean;
  onClose :() => void;
};

const AttachmentsModal = ({
  accessRequestId,
  isVisible,
  onClose
} :Props) => {
  return (
    <Modal
        viewportScrolling
        textTitle="Attachments"
        isVisible={isVisible}
        onClose={onClose}
        withFooter={false}>
      <AttachmentsBody accessRequestId={accessRequestId} />
    </Modal>
  );
};

export default AttachmentsModal;
