import { ISourceConfig } from '../types/source-config';
import { iJSONAPI_Entity, iJSONAPI_Response, iJSONAPI_Response_Relationship } from './types';
import { IKeyValueList } from '../types';

import { createEntity } from '@app-library/entity/entity';
import { IEntity } from '@app-library/entity/types';
import * as Immutable from 'immutable';

export interface IEntityData {
  entity: IEntity;
  relationships: IKeyValueList<iJSONAPI_Entity>
}

export function EntityJsonToEntityData(item: iJSONAPI_Entity, config: ISourceConfig): Immutable.Record<IEntity> {

  const entity: Immutable.Record<IEntity> = createEntity<IEntity>(item.type, item.id);

  entity.merge(item.attributes);
  entity.merge(item.relationships);


  return entity;

}

export function addToMap(map: Map<string, Map<string, any>>, type: string, id: string, item: any) {
  if (!map.has(type)) {
    map.set(type, new Map());
  }

  if (!map.get(type).has(id)) {
    map.get(type).set(id, item);
  }
}


export function itemToArray(data: any): any[] {
  return Array.isArray(data) ? data : [data];
}


function normalizeReference(references: iJSONAPI_Entity[]) {
  const all: Map<string, iJSONAPI_Entity> = new Map();

  references.forEach((entity: iJSONAPI_Entity) => {
    if (!all.has(entity.id)) {
      all.set(entity.id, entity);
    } else {
      const e1 = all.get(entity.id);
      const diff = diffEntity(entity, e1);
      if (diff) {
        all.set(entity.id, { ...entity, ...diff });
      }
    }
  });

  all.forEach((entity: iJSONAPI_Entity) => {
const relationships
  })
}

function getRelationships(entity: iJSONAPI_Entity) {

  return Object.keys(entity.relationships).reduce((acc: Map<iJSONAPI_Entity>, item: iJSONAPI_Response_Relationship) => {
    acc.set(item.id, item);
    return acc;
  }, new Map())
}

function diffEntity(e1: Object, e2: Object) {
  const diff: Partial<iJSONAPI_Entity> = {};
  let isDiff = false;
  Object.keys(e2).forEach((field: string) => {
    if (!e1.hasOwnProperty(field)) {
      diff[field] = e2[field];
      isDiff = true;
    }
  });

  return isDiff ? diff : null;
}


export function getEntitiesAll(response: iJSONAPI_Response, config: ISourceConfig): Map<string, Map<string, IEntityData>> {
  const entitiesAll: Map<string, Map<string, IEntityData>> = new Map();

  if (response.included) {
    response.included.forEach((item: iJSONAPI_Entity) => addToMap(
      entitiesAll,
      item.type,
      item.id,
      EntityJsonToEntityData(item, config)
    )
    );
  }

  if (response.data) {
    itemToArray(response.data).forEach((item: iJSONAPI_Entity) => addToMap(
      entitiesAll,
      item.type,
      item.id,
      EntityJsonToEntityData(item, config)));
  }
  return entitiesAll;
}

export function convertGet(response: iJSONAPI_Response, config: ISourceConfig) {


  const entitiesAll = getEntitiesAll(response, config);


  entitiesAll.forEach((source_map: Map<string, IEntityData>) => {
    source_map.forEach((entity_data: IEntityData) => {
      const entity = entity_data.entity;

      Object.keys(entity_data.relationships)
        .forEach((fieldName: string) => {
          const rel = entity_data.relationships[fieldName];

          let source = null;
          let data: IEntityData = null;

          if (entitiesAll.has(rel.type)) {
            source = entitiesAll.get(rel.type);
          }

          if (source && source.has(rel.id)) {
            data = source.get(rel.id);
          }

          if (!data) {
            data = { entity: new Entity(rel.type, rel.id, config.fields), relationships: {} };
          }

          entity.addRelationship(fieldName, data.entity);

        });
    });
  });

  return itemToArray(response.data)
    .map((item: iJSONAPI_Entity) => entitiesAll.get(item.type).get(item.id).entity);
}
