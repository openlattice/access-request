import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Creatable } from 'lattice-ui-kit';
import { NIL } from 'uuid';

import ModuleProvider from '../../../../core/provider/ModuleProvider';
import SelectTags from '../SelectTags';

describe('SelectTags', () => {
  const mockOnDelete = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('match snapshot', () => {
    const wrapper = mount(
      <ModuleProvider>
        <SelectTags index={NIL} onTagChange={mockOnDelete} value="Other" />
      </ModuleProvider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('invoke onDelete with fileId when clicked', () => {
    const wrapper = mount(
      <ModuleProvider>
        <SelectTags index={NIL} onTagChange={mockOnDelete} value="Other" />
      </ModuleProvider>
    );
    const value = 'test';
    wrapper.find(Creatable).prop('onChange')(value);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(NIL, value);
  });

});
