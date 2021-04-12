import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Tab, Tabs } from 'lattice-ui-kit';
import { act } from 'react-dom/test-utils';
import { NIL } from 'uuid';

import AttachmentsBody from '../AttachmentsBody';
import ManageAttachmentsContainer from '../ManageAttachmentsContainer';
import ModuleProvider from '../../../../core/provider/ModuleProvider';
import UploadAttachmentsContainer from '../UploadAttachmentsContainer';
import { GET_ATTACHMENTS } from '../actions';

const mockDispatch = jest.fn();
const mockUseDispatch = jest.fn();
mockUseDispatch.mockReturnValue(mockDispatch);

jest.mock('../../../../core/redux', () => {
  const {
    useSelector,
    useStore,
    moduleStore,
    moduleContext,
  } = jest.requireActual('../../../../core/redux');
  return {
    moduleContext,
    moduleStore,
    useDispatch: () => mockUseDispatch(),
    useSelector,
    useStore,
  };
});

describe('AttachmentsBody', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {

    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsBody accessRequestId={NIL} />
      </ModuleProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('show Manage and Upload tabs', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsBody accessRequestId={NIL} />
      </ModuleProvider>
    );
    const tabsWrapper = wrapper.find(Tabs);
    const tabWrapper = wrapper.find(Tab);
    expect(tabsWrapper).toHaveLength(1);
    expect(tabWrapper).toHaveLength(2);

    expect(tabWrapper.at(0).prop('label')).toEqual('Manage');
    expect(tabWrapper.at(1).prop('label')).toEqual('Upload');
  });

  test('show ManageAttachmentsContainer by default', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsBody accessRequestId={NIL} />
      </ModuleProvider>
    );

    const manageWrapper = wrapper.find(ManageAttachmentsContainer);
    expect(manageWrapper).toHaveLength(1);
    const uploadWrapper = wrapper.find(UploadAttachmentsContainer);
    expect(uploadWrapper).toHaveLength(0);
  });

  test('show UploadAttachmentsContainer on upload tab click', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsBody accessRequestId={NIL} />
      </ModuleProvider>
    );

    const tabWrapper = wrapper.find(Tab);
    tabWrapper.at(1).simulate('click');

    const manageWrapper = wrapper.find(ManageAttachmentsContainer);
    expect(manageWrapper).toHaveLength(0);
    const uploadWrapper = wrapper.find(UploadAttachmentsContainer);
    expect(uploadWrapper).toHaveLength(1);
  });

  test('show ManageAttachmentsContainer on upload success', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsBody accessRequestId={NIL} />
      </ModuleProvider>
    );

    const tabWrapper = wrapper.find(Tab);
    tabWrapper.at(1).simulate('click');
    const uploadWrapper = wrapper.find(UploadAttachmentsContainer);

    act(() => {
      uploadWrapper.prop('onSuccess')();
    });

    expect(uploadWrapper).toHaveLength(1);
    const manageWrapper = wrapper.find(ManageAttachmentsContainer);
    expect(manageWrapper).toHaveLength(0);
  });

  test('dispatch GET_ATTACHMENTS with accessRequestId', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentsBody accessRequestId={NIL} />
      </ModuleProvider>
    );

    const attachmentsBodyWrapper = wrapper.find(AttachmentsBody);
    expect(attachmentsBodyWrapper.prop('accessRequestId')).toEqual(NIL);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('id');
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('type', GET_ATTACHMENTS);
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('value', NIL);
  });

});
