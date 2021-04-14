import { fromJS } from 'immutable';
/* eslint-disable import/no-extraneous-dependencies */
import { NIL } from 'uuid';

import { DOCX_MIME_TYPE, IMAGE_TYPE_PREFIX, PDF_MIME_TYPE } from '../../../../constants/FileTypeConstants';

// use static date time for test snapshots
const MOCK_UPLOAD_DATE = '2021-01-01T00:00:00.000-08:00';

const MOCK_FILE_ENTITY = {
  'ol.filedata': [
    'test'
  ],
  'ol.datetime': [
    MOCK_UPLOAD_DATE
  ],
  'ol.type': [
    'image/jpeg'
  ],
  'ol.name': [
    'openlattice-logo.svg'
  ],
  'ol.label': [
    'Other'
  ],
  'openlattice.@id': [
    NIL
  ]
};

const MOCK_PDF_FILE_ENTITY = {
  'ol.filedata': [
    'test'
  ],
  'ol.datetime': [
    MOCK_UPLOAD_DATE
  ],
  'ol.type': [
    PDF_MIME_TYPE
  ],
  'ol.name': [
    'openlattice-logo.svg'
  ],
  'ol.label': [
    'Other'
  ],
  'openlattice.@id': [
    NIL
  ]
};

const MOCK_DOCX_FILE_ENTITY = {
  'ol.filedata': [
    'test'
  ],
  'ol.datetime': [
    MOCK_UPLOAD_DATE
  ],
  'ol.type': [
    DOCX_MIME_TYPE
  ],
  'ol.name': [
    'openlattice-logo.svg'
  ],
  'ol.label': [
    'Other'
  ],
  'openlattice.@id': [
    NIL
  ]
};

const MOCK_ATTACHMENTS = fromJS(
  {
    [NIL]: MOCK_FILE_ENTITY
  }
);

const MOCK_FILE_ENTITY_ENTITY_ID = NIL;

const MOCK_PDF_FILE = {
  name: 'test.pdf',
  type: PDF_MIME_TYPE,
  base64: 'test'
};

const MOCK_DOCX_FILE = {
  name: 'test.docx',
  type: DOCX_MIME_TYPE,
  base64: 'test'
};

const MOCK_IMAGE_FILE = {
  name: 'test.png',
  type: `${IMAGE_TYPE_PREFIX}/png`,
  base64: 'test'
};

export {
  MOCK_ATTACHMENTS,
  MOCK_DOCX_FILE,
  MOCK_DOCX_FILE_ENTITY,
  MOCK_FILE_ENTITY,
  MOCK_FILE_ENTITY_ENTITY_ID,
  MOCK_IMAGE_FILE,
  MOCK_PDF_FILE,
  MOCK_PDF_FILE_ENTITY,
};
