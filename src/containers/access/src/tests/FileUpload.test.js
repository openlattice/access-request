import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { MOCK_PDF_FILE } from './constants';

import FileUpload from '../FileUpload';

describe('FileUpload', () => {
  const mockOnChange = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {
    const wrapper = mount(<FileUpload onChange={mockOnChange} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('onDrop invoke readAsDataUrl', async () => {
    const wrapper = mount(<FileUpload onChange={mockOnChange} />);
    const readAsDataURLSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL');

    const inputWrapper = wrapper.find('input');
    await act(async () => {
      inputWrapper.simulate('change', {
        target: { files: [MOCK_PDF_FILE] }
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      wrapper.update();
    });
    expect(readAsDataURLSpy).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange.mock.calls[0][0]).toHaveProperty('file');
    expect(mockOnChange.mock.calls[0][0]).toHaveProperty(['file', 'base64']);
    expect(mockOnChange.mock.calls[0][0]).toHaveProperty(['file', 'name']);
    expect(mockOnChange.mock.calls[0][0]).toHaveProperty(['file', 'type']);
  });

});
