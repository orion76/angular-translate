import { IKeyValueList } from '@app-library/ng-http-service/types';

export type tJSONAPIFilterOperators =
  '='
  | '>'
  | '<'
  | '>='
  | '<='
  | '!='
  | 'NOT IN'
  | 'CONTAINS'
  | 'STARTS_WITH'
  | 'BETWEEN'
  | 'IN';
export type tJSONAPIFilterConjunctions = 'AND' | 'OR' | 'XOR';

export interface iJSONAPI_Response_Relationship {
  data: iJSONAPI_Entity | iJSONAPI_Entity[],
}

export interface iJSONAPI_Entity {
  id: string,
  type: string,
  attributes?: IKeyValueList<string>,
  relationships?: IKeyValueList<iJSONAPI_Response_Relationship>
}

export interface iJSONAPI_Response {
  data: iJSONAPI_Entity | iJSONAPI_Entity[],
  included?: iJSONAPI_Entity[],
}

export interface iJSONAPI_Filter {
  field: string[],
  value: string[],
  operator: tJSONAPIFilterOperators,
  conjunction?: tJSONAPIFilterConjunctions,
}

export interface JSONAPIFilter {
  fieldName: string,
  value: string[]
}








