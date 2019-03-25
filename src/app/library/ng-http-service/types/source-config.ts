
import { IKeyValueList } from '../types';
import { TEntityFieldType } from '../entity/types';

export interface ISourceConfig {
  id: string;
  label: string;
  fields: IKeyValueList<IFieldOptions>;
  url: string;
  one: ISourceConfigRestQuery;
  list: ISourceConfigRestQuery;

}

export interface IFieldOptions {
  type: TEntityFieldType;
  valueType?: any;
  source?: ISourceConfig;
}


export interface ISourceConfigRestQuery {
  id?: string,
  include?: string[],
  filters?: IKeyValueList<string[]>
}

