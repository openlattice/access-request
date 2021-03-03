/*
 * @flow
 */

import _isArray from 'lodash/isArray';
import {
  Map,
  Set,
  getIn,
  isCollection,
} from 'immutable';
import { Models } from 'lattice';
import type { PropertyType, UUID } from 'lattice';

import { EDM, PROPERTY_TYPES, PROPERTY_TYPES_INDEX_MAP } from '../constants';

const { FQN } = Models;

const EMPTY_MAP = Map();

export default function selectPropertyTypeIDsByFQN(fqns :Set<FQN | string> | Array<FQN | string>) {

  return (state :Map) :Map<FQN | string, UUID> => {

    if (!_isArray(fqns) && !isCollection(fqns)) {
      return EMPTY_MAP;
    }

    const propertyTypesMap = Map().withMutations((map :Map) => {
      fqns.forEach((fqn :FQN | string) => {
        if (FQN.isValid(fqn)) {
          const propertyTypeIndex :number = getIn(state, [EDM, PROPERTY_TYPES_INDEX_MAP, fqn], -1);
          if (propertyTypeIndex >= 0) {
            const propertyType :?PropertyType = getIn(state, [EDM, PROPERTY_TYPES, propertyTypeIndex]);
            if (propertyType && propertyType.id) {
              map.set(fqn, propertyType.id);
            }
          }
        }
      });
    });

    if (propertyTypesMap.isEmpty()) {
      return EMPTY_MAP;
    }

    return propertyTypesMap;
  };
}
