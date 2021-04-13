import toJson from 'enzyme-to-json';
import { faPaperclip } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mount, shallow } from 'enzyme';
import { IconButton } from 'lattice-ui-kit';
import { NIL } from 'uuid';

import AccessRequestAttachmentButton from '../AccessRequestAttachmentButton';
import AttachmentsModal from '../AttachmentsModal';
import ModuleProvider from '../../../../core/provider/ModuleProvider';

const mockDispatch = jest.fn();
const mockUseDispatch = jest.fn();
mockUseDispatch.mockReturnValue(mockDispatch);

jest.mock('../../../../core/redux', () => {
  const redux = jest.requireActual('../../../../core/redux');
  return {
    ...redux,
    useDispatch: () => mockUseDispatch(),
  };
});

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

  test('click sets AttachmentsModal isVisible to true', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AccessRequestAttachmentButton accessRequestId={NIL} />
      </ModuleProvider>
    );

    expect(wrapper.find(AttachmentsModal).prop('isVisible')).toEqual(false);
    const button = wrapper.find('button');
    button.simulate('click');
    wrapper.update();
    expect(wrapper.find(AttachmentsModal).prop('isVisible')).toEqual(true);
  });

});
