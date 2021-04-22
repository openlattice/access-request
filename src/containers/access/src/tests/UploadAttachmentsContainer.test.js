import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { NIL } from 'uuid';

import ModuleProvider from '../../../../core/provider/ModuleProvider';
import UploadAttachmentsContainer from '../UploadAttachmentsContainer';

describe('UploadAttachmentsContainer', () => {
  const mockOnSuccess = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {
    const wrapper = mount(
      <ModuleProvider>
        <UploadAttachmentsContainer accessRequestId={NIL} onSuccess={mockOnSuccess} />
      </ModuleProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('return empty list by default', () => {
    const wrapper = mount(
      <ModuleProvider>
        <UploadAttachmentsContainer accessRequestId={NIL} onSuccess={mockOnSuccess} />
      </ModuleProvider>
    );

    expect(wrapper.find('list').children()).toHaveLength(0);
  });

});
