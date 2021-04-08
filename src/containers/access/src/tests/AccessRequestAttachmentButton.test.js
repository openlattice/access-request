import toJson from 'enzyme-to-json';
import { faPaperclip } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shallow } from 'enzyme';
import { IconButton } from 'lattice-ui-kit';
import { NIL } from 'uuid';

import AccessRequestAttachmentButton from '../AccessRequestAttachmentButton';

describe('AccessRequestAttachmentButton', () => {
  test('mount IconButton with faPaperclip', () => {
    const wrapper = shallow(<AccessRequestAttachmentButton accessRequestId={NIL} />);
    const iconButton = wrapper.find(IconButton);
    const icon = iconButton.find(FontAwesomeIcon);

    expect(iconButton).toHaveLength(1);
    expect(iconButton.prop('aria-label')).toEqual('access request attachment button');

    expect(icon).toHaveLength(1);
    expect(icon.prop('icon')).toEqual(faPaperclip);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
