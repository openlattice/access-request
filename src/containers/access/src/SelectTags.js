// @flow
import { Creatable } from 'lattice-ui-kit';

import { TAG_OPTIONS } from './constants';

type Props = {
  index :?number | string;
  onTagChange :Function;
  value :string;
};

const SelectTags = ({ index, onTagChange, value } :Props) => {
  const onChange = (newValue :string) => {
    onTagChange(index, newValue);
  };

  return (
    <Creatable
        isClearable
        onChange={onChange}
        options={TAG_OPTIONS}
        placeholder="Select or create tag"
        useRawValues
        value={value} />
  );
};

export default SelectTags;
