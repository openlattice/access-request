// @flow
import React from 'react';

import Dropzone from '../../../components/Dropzone';

type Props = {
  onChange :Function
}

const FileUpload = ({
  onChange
} :Props) => {

  const onDrop = (files) => {
    files.forEach((file) => {
      const { name, type } = file;
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64 = event.target.result;

        onChange({
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
