

import { IEntity } from '../entity/types';
import { ISourceConfig } from '../types/source-config';
import { iJSONAPI_Entity, iJSONAPI_Response } from './types';
import { IKeyValueList } from '../types';
import { Entity } from '../entity/entity.class';


export interface IEntityData {
  entity: IEntity;
  relationships: IKeyValueList<iJSONAPI_Entity>
}

export function EntityJsonToEntityData(item: iJSONAPI_Entity, config: ISourceConfig): IEntityData {

  const entity: IEntity = new Entity(item.type, item.id, config.fields);
  const relationships: IKeyValueList<iJSONAPI_Entity> = {};

  if (item.attributes) {
    Object.keys(item.attributes)
      .filter((key: string) => item.attributes[key] !== null && item.attributes[key] !== undefined)
      .forEach((name: string) => entity.setFieldValue(name, item.attributes[name])
      );
  }

  if (item.relationships) {
    Object.keys(item.relationships)
      .map((name: string) => {
        itemToArray(item.relationships[name]['data'])
          .forEach((item: iJSONAPI_Entity) => relationships[name] = item);
      }
      );
  }

  return { entity, relationships: relationships };

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
