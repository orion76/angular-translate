import {IKeyValueList} from '@xangular-common/common';

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
  data: IJSONAPIEntity | IJSONAPIEntity[];
}

export interface IJSONAPIEntity {
  id: string;
  type: string;
  attributes?: IKeyValueList<string>;
  relationships?: IKeyValueList<iJSONAPI_Response_Relationship>;
}

export interface IJSONAPIResponse {
  data: IJSONAPIEntity | IJSONAPIEntity[];
  included?: IJSONAPIEntity[];
}

export interface iJSONAPI_Filter {
  field: string[];
  value: string[];
  operator: tJSONAPIFilterOperators;
  conjunction?: tJSONAPIFilterConjunctions;
}

export interface JSONAPIFilter {
  fieldName: string;
  value: string[];
}








