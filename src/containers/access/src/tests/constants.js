import { fromJS } from 'immutable';
import { DateTime } from 'luxon';
/* eslint-disable import/no-extraneous-dependencies */
import { NIL } from 'uuid';

import { DOCX_MIME_TYPE, PDF_MIME_TYPE } from '../../../../constants/FileTypeConstants';

const MOCK_FILE = {
  'ol.filedata': [
    'https://openlattice.com/orgs/static/assets/ol-icon.2e9841c7bafdc51236eb.svg'
  ],
  'ol.datetime': [
    DateTime.local(2021).toISO()
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

const MOCK_PDF_FILE = {
  'ol.filedata': [
    'https://openlattice.com/orgs/static/assets/ol-icon.2e9841c7bafdc51236eb.svg'
  ],
  'ol.datetime': [
    DateTime.local(2021).toISO()
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

const MOCK_DOCX_FILE = {
  'ol.filedata': [
    'https://openlattice.com/orgs/static/assets/ol-icon.2e9841c7bafdc51236eb.svg'
  ],
  'ol.datetime': [
    DateTime.local(2021).toISO()
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
    [NIL]: MOCK_FILE
  }
);

const MOCK_FILE_ID = NIL;

export {
  MOCK_ATTACHMENTS,
  MOCK_DOCX_FILE,
  MOCK_FILE,
  MOCK_FILE_ID,
  MOCK_PDF_FILE,
};
