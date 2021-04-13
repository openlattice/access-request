import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Modal } from 'lattice-ui-kit';
import { NIL } from 'uuid';

import AttachmentsBody from '../AttachmentsBody';
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

describe('AttachmentsModal', () => {

  test('match snapshot when closed', () => {

    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsModal accessRequestId={NIL} />
      </ModuleProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('match snapshot when open', () => {

    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsModal accessRequestId={NIL} isVisible />
      </ModuleProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('render modal', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsModal accessRequestId={NIL} isVisible />
      </ModuleProvider>
    );
    const modalWrapper = wrapper.find(Modal);
    expect(modalWrapper).toHaveLength(1);
  });

  test('render AttachmentsBody as Modal child', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsModal accessRequestId={NIL} isVisible />
      </ModuleProvider>
    );
    const modalWrapper = wrapper.find(Modal);
    expect(modalWrapper.contains(AttachmentsBody)).toEqual(true);
  });

  test('pass accessRequestId to AttachmentsBody', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsModal accessRequestId={NIL} isVisible />
      </ModuleProvider>
    );

    const attachmentsBodyWrapper = wrapper.find(AttachmentsBody);
    const modalWrapper = wrapper.find(AttachmentsModal);
    expect(attachmentsBodyWrapper.prop('accessRequestId')).toEqual(modalWrapper.prop('accessRequestId'));

  });

});
