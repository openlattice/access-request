// @flow
import { Map } from 'immutable';
import { DataUtils } from 'lattice-utils';
import { DateTime } from 'luxon';

import { PropertyTypes } from '../core/edm/constants';

const { getEntityKeyId, getPropertyValue } = DataUtils;

const {
  DATE_TIME,
  FILE_DATA,
  GROUP_ID,
  NAME,
  TYPE,
} = PropertyTypes;

// turns Map of attachment entities keyed by entity key id into
// POJO list multimap keyed by group id.
const transformAttachments = (attachmentsMap :Map) => {

  const attachments = attachmentsMap.map((attachment) => {
    const datetimeStr = getPropertyValue(attachment, [DATE_TIME, 0]);
    const date = DateTime.fromISO(datetimeStr).toLocaleString(DateTime.DATETIME_SHORT);
    const fieldId = getPropertyValue(attachment, [GROUP_ID, 0]);
    const href = getPropertyValue(attachment, [FILE_DATA, 0]);
    const id = getEntityKeyId(attachment);
    const name = getPropertyValue(attachment, [NAME, 0]);
    const type = getPropertyValue(attachment, [TYPE, 0]);

    return {
      date,
      fieldId,
      href,
      id,
      name,
      type,
    };
  });

  const attachmentsByGroupId = attachments
    .valueSeq()
    .groupBy((x) => x.fieldId)
    .toJS();

  return attachmentsByGroupId;
};

export default transformAttachments;
