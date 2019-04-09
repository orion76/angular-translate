import {IEntity} from '@xangular-common/entity';
import {IJSONAPIEntity, IJSONAPIResponse} from './types';


export function itemToArray(data: any): any[] {
  return Array.isArray(data) ? data : [data];
}


function normalizeReference(references: IJSONAPIEntity[]): Map<string, IJSONAPIEntity> {
  const all: Map<string, IJSONAPIEntity> = new Map();

  references.forEach((entity: IJSONAPIEntity) => {
    if (!all.has(entity.id)) {
      Object.keys(entity.relationships).forEach((field: string) => {
        entity.relationships[field].data = itemToArray(entity.relationships[field].data);
      });
      all.set(entity.id, entity);
    }
  });
  return all;
}

function setRelationships(all: Map<string, IJSONAPIEntity>) {

  all.forEach((entity: IJSONAPIEntity) => {
    Object.keys(entity.relationships).forEach((field: string) => {


      const dataOld: IJSONAPIEntity[] = entity.relationships[field].data as IJSONAPIEntity[];

      dataOld
        .filter((rel: IJSONAPIEntity) => rel !== null || undefined)
        .forEach((rel: IJSONAPIEntity) => {
          if (!all.has(rel.id)) {
            all.set(rel.id, rel);

          } else {
            const relExist = all.get(rel.id);
            const attributesDiff = diffObjects(rel.attributes, relExist.attributes);
            if (attributesDiff) {
              relExist.attributes = {...relExist.attributes, ...attributesDiff};
            }
          }
        });
    });
  });
}

function diffObjects(e1: object, e2: object) {
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


export function convert(response: IJSONAPIResponse) {

  const entities = itemToArray(response.data);

  const includes = response.included ? response.included : [];

  const entitiesMap = normalizeReference(entities.concat(includes));
  setRelationships(entitiesMap);

  return responseToEntity(entities);
}

export function responseToEntity(entities: IJSONAPIEntity[]): IEntity[] {
  return entities.map((entity: IJSONAPIEntity) => {
    return {
      id: entity.id,
      source: entity.type,
      ...entity.attributes,
      ...entity.relationships
    };
  });
}
