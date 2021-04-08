import toJson from 'enzyme-to-json';
import { faPaperclip } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shallow } from 'enzyme';
import { IconButton } from 'lattice-ui-kit';
import { NIL } from 'uuid';

import AccessRequestAttachmentButton from '../AccessRequestAttachmentButton';
import AttachmentsModal from '../AttachmentsModal';

describe('AccessRequestAttachmentButton', () => {
  test('match snapshot when closed', () => {

    const wrapper = shallow(<AccessRequestAttachmentButton accessRequestId={NIL} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('mount IconButton with faPaperclip', () => {
    const wrapper = shallow(<AccessRequestAttachmentButton accessRequestId={NIL} />);
    const iconButton = wrapper.find(IconButton);
    const icon = iconButton.find(FontAwesomeIcon);

    expect(iconButton).toHaveLength(1);
    expect(iconButton.prop('aria-label')).toEqual('access request attachment button');

    expect(icon).toHaveLength(1);
    expect(icon.prop('icon')).toEqual(faPaperclip);
  });

  test('mount AttachmentsModal', () => {
    const wrapper = shallow(<AccessRequestAttachmentButton accessRequestId={NIL} />);
    const attachmentsModal = wrapper.find(AttachmentsModal);

    expect(attachmentsModal).toHaveLength(1);
  });

});
