// @flow
import { Modal } from 'lattice-ui-kit';

import AttachmentsBody from './AttachmentsBody';

type Props = {
  isVisible :boolean;
  onClose :() => void;
};

const AttachmentsModal = ({
  isVisible,
  onClose
} :Props) => {
  return (
    <Modal
        textTitle="Attachments"
        isVisible={isVisible}
        onClose={onClose}
        withFooter={false}>
      <AttachmentsBody />
    </Modal>
  );
};

export default AttachmentsModal;
