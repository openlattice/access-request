import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Creatable } from 'lattice-ui-kit';
import { NIL } from 'uuid';

import ModuleProvider from '../../../../core/provider/ModuleProvider';
import SelectTags from '../SelectTags';

describe('SelectTags', () => {
  const mockOnTagChange = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {
    const wrapper = mount(
      <ModuleProvider>
        <SelectTags index={NIL} onTagChange={mockOnTagChange} value="Other" />
      </ModuleProvider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('invoke onTagChange for change events', () => {
    const wrapper = mount(
      <ModuleProvider>
        <SelectTags index={NIL} onTagChange={mockOnTagChange} value="Other" />
      </ModuleProvider>
    );
    const value = 'test';
    wrapper.find(Creatable).prop('onChange')(value);
    expect(mockOnTagChange).toHaveBeenCalledTimes(1);
    expect(mockOnTagChange).toHaveBeenCalledWith(NIL, value);
  });

});
