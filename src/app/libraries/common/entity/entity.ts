import * as Immutable from 'immutable';
import { IEntity } from './types';


export function createEntity<T extends IEntity>(source: string, id: string, fields = {}) {
  const entity = Immutable.Record<T>({ id, source, ...fields } as T)

  entity.prototype.fieldType = fieldType;

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
