import toJson from 'enzyme-to-json';
import {
  faFilePdf,
  faFileWord,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { NIL } from 'uuid';

import { MOCK_DOCX_FILE, MOCK_FILE, MOCK_FILE_ID, MOCK_PDF_FILE } from './constants';

import AttachmentItem from '../AttachmentItem';
import ModuleProvider from '../../../../core/provider/ModuleProvider';
import SelectTags from '../SelectTags';
import { UPDATE_ATTACHMENT_TAG } from '../actions';

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

describe('AttachmentItem', () => {
  const mockOnDelete = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentItem divider file={MOCK_FILE} onDelete={mockOnDelete} />
      </ModuleProvider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('toggle edit should toggle SelectTags', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentItem divider file={MOCK_FILE} onDelete={mockOnDelete} />
      </ModuleProvider>
    );

    // default hide SelectTags
    expect(wrapper.find(SelectTags)).toHaveLength(0);
    // show SelectTags
    wrapper.find('button[aria-label="Edit Tag"]').simulate('click');
    expect(wrapper.find(SelectTags)).toHaveLength(1);
    // hide SelectTags
    wrapper.find('button[aria-label="Edit Tag"]').simulate('click');
    expect(wrapper.find(SelectTags)).toHaveLength(0);
  });

  test('invoke onDelete with fileId when clicked', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentItem divider file={MOCK_FILE} onDelete={mockOnDelete} />
      </ModuleProvider>
    );

    wrapper.find('button[aria-label="Delete"]').simulate('click');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(MOCK_FILE_ID);
  });

  test('show docx icon for .docx files', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentItem divider file={MOCK_DOCX_FILE} onDelete={mockOnDelete} />
      </ModuleProvider>
    );

    const previewWrapper = wrapper.find(FontAwesomeIcon).first();
    expect(previewWrapper.prop('icon')).toEqual(faFileWord);
  });

  test('show pdf icon for .pdf files', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentItem divider file={MOCK_PDF_FILE} onDelete={mockOnDelete} />
      </ModuleProvider>
    );

    const previewWrapper = wrapper.find(FontAwesomeIcon).first();
    expect(previewWrapper.prop('icon')).toEqual(faFilePdf);
  });

  test('dispatch UPDATE_ATTACHMENT_TAG and set editing to false onTagChange', () => {
    const wrapper = mount(
      <ModuleProvider>
        <AttachmentItem divider file={MOCK_FILE} onDelete={mockOnDelete} />
      </ModuleProvider>
    );

    wrapper.find('button[aria-label="Edit Tag"]').simulate('click');
    const selectTagsWrapper = wrapper.find(SelectTags);
    act(() => {
      selectTagsWrapper.prop('onTagChange')(NIL, 'Other');
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('id');
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('type', UPDATE_ATTACHMENT_TAG);
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('value', {
      entityKeyId: NIL,
      tag: 'Other'
    });
    wrapper.update();
    expect(wrapper.find(SelectTags)).toHaveLength(0);
  });

});
