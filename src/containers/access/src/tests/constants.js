import { fromJS } from 'immutable';
import { DateTime } from 'luxon';
/* eslint-disable import/no-extraneous-dependencies */
import { NIL } from 'uuid';

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

const MOCK_ATTACHMENTS = fromJS(
  {
    [NIL]: MOCK_FILE
  }
);

export {
  MOCK_ATTACHMENTS,
  MOCK_FILE,
};
