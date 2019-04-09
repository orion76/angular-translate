import * as Immutable from 'immutable';
import {IEntity} from './types';
import {TEntityFields} from '@app-library/components/form/types';


export function createEntity<T extends IEntity>(
  source: string,
  id: string,
  config: TEntityFields<T>,
  values?: Partial<T>
): Immutable.RecordOf<T> {

  if (!values) {
    values = {};
  }

  const fields: any = {id, source, ...values};

  Object.keys(config)
    .filter((field: string) => !values[field])
    .forEach((field: string) => fields[field] = config[field].empty);

  const entity = Immutable.Record<T>(fields as T);

  // entity.prototype.fieldType = fieldType;

  return new entity();
}


function fieldType(fieldName: string) {

  console.warn(this);

  if (!this.hasOwnProperty(fieldName)) {
    return undefined;
  }

  const field = this[fieldName];

  switch (typeof field) {
    case 'string':
    case 'number':
    case 'boolean':
      return 'attribute';

  }

  if (field instanceof Array || isEntity(field)) {
    return 'reference';
  }

}

function isEntity(entity: any) {
  return 'id' in entity && 'source' in entity;
}
