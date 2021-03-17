/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { Colors, Typography } from 'lattice-ui-kit';
import { useDropzone } from 'react-dropzone';

import {
  ALL_IMAGE_MIME_TYPE,
  DOCX_MIME_TYPE,
  PDF_MIME_TYPE,
} from '../constants/FileTypeConstants';

const {
  BLUE,
  NEUTRAL,
  PURPLE,
  RED,
} = Colors;

const ACCEPTED_MIME_TYPES = [
  ALL_IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  DOCX_MIME_TYPE,
];

const getColor = (props) => {
  if (props.isDragAccept) {
    return PURPLE.P300;
  }
  if (props.isDragReject) {
    return RED.R300;
  }
  if (props.isDragActive) {
    return BLUE.B300;
  }
  return NEUTRAL.N100;
};

const DropzoneWrapper = styled.div`
  align-items: center;
  background-color: ${NEUTRAL.N50};
  border-color: ${(props) => getColor(props)};
  border-radius: 3px;
  border-style: dashed;
  border-width: 2px;
  display: flex;
  flex-direction: column;
  flex: 1;
  outline: none;
  padding: 32px;
  transition: border 250ms ease-in-out;
`;

type Props = {
  onDrop :Function;
};

const Dropzone = (props :Props) => {
  const { onDrop } = props;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: ACCEPTED_MIME_TYPES.join(','),
    onDrop
  });

  const {
    onBlur,
    onClick,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop: onDropRoot,
    onFocus,
    onKeyDown,
    ref,
    tabIndex
  } = getRootProps();

  const {
    accept,
    autoComplete,
    multiple,
    onChange,
    onClick: onClickInput,
    ref: refInput,
    style,
    tabIndex: tabIndexInput,
    type,
  } = getInputProps();

  return (
    <DropzoneWrapper
        isDragActive={isDragActive}
        isDragAccept={isDragAccept}
        isDragReject={isDragReject}
        onBlur={onBlur}
        onClick={onClick}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDropRoot}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        ref={ref}
        tabIndex={tabIndex}>
      <input
          accept={accept}
          autoComplete={autoComplete}
          multiple={multiple}
          onChange={onChange}
          onClick={onClickInput}
          ref={refInput}
          style={style}
          tabIndex={tabIndexInput}
          type={type} />
      <Typography component="span">Drop files here or click to select.</Typography>
    </DropzoneWrapper>
  );
};

export default Dropzone;
