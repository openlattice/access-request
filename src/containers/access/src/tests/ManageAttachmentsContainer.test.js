import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Map } from 'immutable';
import { List } from 'lattice-ui-kit';
import { NIL } from 'uuid';

import { MOCK_ATTACHMENTS } from './constants';

import ManageAttachmentsContainer from '../ManageAttachmentsContainer';
import ModuleProvider from '../../../../core/provider/ModuleProvider';
import { selectAttachments } from '../../../../core/redux/selectors';
import { DELETE_ATTACHMENTS, GET_ATTACHMENTS } from '../actions';

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

jest.mock('../../../../core/redux/selectors', () => ({
  selectAttachments: jest.fn()
}));

describe('ManageAttachmentsContainer', () => {
  beforeEach(() => {
    selectAttachments.mockImplementation(() => () => Map());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {
    const wrapper = mount(
      <ModuleProvider>
        <ManageAttachmentsContainer accessRequestId={NIL} />
      </ModuleProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('return empty list by default', () => {
    const wrapper = mount(
      <ModuleProvider>
        <ManageAttachmentsContainer accessRequestId={NIL} />
      </ModuleProvider>
    );

    expect(wrapper.find('list').children()).toHaveLength(0);
  });

  test('return list of attachments', () => {
    selectAttachments.mockImplementation(() => () => MOCK_ATTACHMENTS);
    const wrapper = mount(
      <ModuleProvider>
        <ManageAttachmentsContainer accessRequestId={NIL} />
      </ModuleProvider>
    );

    expect(wrapper.find(List).children()).toHaveLength(1);
  });

  test('dispatch GET_ATTACHMENTS with accessRequestId on mount', () => {
    const wrapper = mount(
      <ModuleProvider>
        <ManageAttachmentsContainer accessRequestId={NIL} />
      </ModuleProvider>
    );

    const attachmentsBodyWrapper = wrapper.find(ManageAttachmentsContainer);
    expect(attachmentsBodyWrapper.prop('accessRequestId')).toEqual(NIL);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('id');
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('type', GET_ATTACHMENTS);
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('value', NIL);
  });

  test('dispatch DELETE_ATTACHMENTS when onDelete is called', () => {
    selectAttachments.mockImplementation(() => () => MOCK_ATTACHMENTS);
    const wrapper = mount(
      <ModuleProvider>
        <ManageAttachmentsContainer accessRequestId={NIL} />
      </ModuleProvider>
    );

    const deleteButtonWrapper = wrapper.find('button[aria-label="Delete"]');
    expect(deleteButtonWrapper).toHaveLength(1);
    deleteButtonWrapper.simulate('click');
    expect(mockDispatch.mock.calls[1][0]).toHaveProperty('id');
    expect(mockDispatch.mock.calls[1][0]).toHaveProperty('type', DELETE_ATTACHMENTS);
    expect(mockDispatch.mock.calls[1][0]).toHaveProperty('value', [NIL]);
  });

});
