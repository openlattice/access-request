import toJson from 'enzyme-to-json';
import {
  faFilePdf,
  faFileWord,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mount } from 'enzyme';

import { MOCK_DOCX_PAYLOAD, MOCK_IMAGE_PAYLOAD, MOCK_PDF_PAYLOAD } from './constants';

import DocumentItem from '../DocumentItem';

describe('DocumentItem', () => {
  const mockOnDelete = jest.fn();
  const mockOnTagChange = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {
    const wrapper = mount(
      <DocumentItem
          divider
          file={MOCK_IMAGE_PAYLOAD}
          index={0}
          onDelete={mockOnDelete}
          onTagChange={mockOnTagChange}
          tag="test" />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('invoke onDelete with index when clicked', () => {
    const wrapper = mount(
      <DocumentItem
          divider
          file={MOCK_DOCX_PAYLOAD}
          index={0}
          onDelete={mockOnDelete}
          onTagChange={mockOnTagChange}
          tag="test" />
    );

    wrapper.find('button[aria-label="Remove"]').simulate('click');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(0);
  });

  test('show docx icon for .docx files', () => {
    const wrapper = mount(
      <DocumentItem
          divider
          file={MOCK_DOCX_PAYLOAD}
          index={0}
          onDelete={mockOnDelete}
          onTagChange={mockOnTagChange}
          tag="test" />
    );

    const previewWrapper = wrapper.find(FontAwesomeIcon).first();
    expect(previewWrapper.prop('icon')).toEqual(faFileWord);
  });

  test('show pdf icon for .pdf files', () => {
    const wrapper = mount(
      <DocumentItem
          divider
          file={MOCK_PDF_PAYLOAD}
          index={0}
          onDelete={mockOnDelete}
          onTagChange={mockOnTagChange}
          tag="test" />
    );

    const previewWrapper = wrapper.find(FontAwesomeIcon).first();
    expect(previewWrapper.prop('icon')).toEqual(faFilePdf);
  });

});
