// @flow
import { useCallback } from 'react';

import Dropzone from '../../../components/Dropzone';

type Props = {
  onChange :Function
}

const FileUpload = ({
  onChange
} :Props) => {

  const handleChange = useCallback((args) => onChange(args), [onChange]);

  const onDrop = (files) => {
    files.forEach((file) => {
      const { name, type } = file;
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;
        handleChange({
          file: {
            base64,
            name,
            type
          }
        });
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Dropzone onDrop={onDrop} />
  );
};

export default FileUpload;
