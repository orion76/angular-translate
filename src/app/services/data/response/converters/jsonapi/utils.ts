

import { IEntity } from '@xangular-common/entity';
import { iJSONAPI_Entity, iJSONAPI_Response } from './types';


export function itemToArray(data: any): any[] {
  return Array.isArray(data) ? data : [data];
}


function normalizeReference(references: iJSONAPI_Entity[]): Map<string, iJSONAPI_Entity> {
  const all: Map<string, iJSONAPI_Entity> = new Map();

  references.forEach((entity: iJSONAPI_Entity) => {
    if (!all.has(entity.id)) {
      Object.keys(entity.relationships).forEach((field: string) => {
        entity.relationships[field].data = itemToArray(entity.relationships[field].data)
      })
      all.set(entity.id, entity);
    }
  });
  return all;
}

function setRelationships(all: Map<string, iJSONAPI_Entity>) {

  all.forEach((entity: iJSONAPI_Entity) => {
    Object.keys(entity.relationships).forEach((field: string) => {

      const dataNew: iJSONAPI_Entity[] = [];
      const dataOld: iJSONAPI_Entity[] = entity.relationships[field].data as iJSONAPI_Entity[];

      dataOld.forEach((rel: iJSONAPI_Entity) => {
        if (!all.has(rel.id)) {
          all.set(rel.id, rel);
          dataNew.push(rel);
        } else {
          const relExist = all.get(rel.id);
          const attributesDiff = diffObjects(rel.attributes, relExist.attributes);
          if (attributesDiff) {
            relExist.attributes = { ...relExist.attributes, ...attributesDiff };
          }
        }
      })
    })
  })
}

function diffObjects(e1: Object, e2: Object) {
  const diff: any = {};
  let isDiff = false;
  Object.keys(e2).forEach((field: string) => {
    if (!e1.hasOwnProperty(field)) {
      diff[field] = e2[field];
      isDiff = true;
    }
  });

  return isDiff ? diff : null;
}



export function convertGet(response: iJSONAPI_Response) {

  const entities = itemToArray(response.data);

  const includes = response.included ? response.included : [];

  const entitiesMap = normalizeReference(entities.concat(includes));
  setRelationships(entitiesMap);

  return responseToEntity(entities);
}

export function responseToEntity(entities: iJSONAPI_Entity[]): IEntity[] {
  return entities.map((entity: iJSONAPI_Entity) => {
    return {
      id: entity.id,
      source: entity.type,
      ...entity.attributes,
      ...entity.relationships
    }
  })
}
