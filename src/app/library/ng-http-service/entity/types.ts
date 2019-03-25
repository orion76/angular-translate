import { IKeyValueList } from '../types';
export type TEntityFieldType = 'attribute' | 'relationship';
export enum EEntityDeleted {
  NOT_DELETED = 0,
  DELETED_MARK = 1,
  DELETED_ALLOWED = 10,
  DELETED = 20,
}

export interface IEntityFieldOptions {

  type: string,
}
export interface IEntityField {
  name: string;
  type: TEntityFieldType;

  getValue<T extends any | IEntity>(): T;

  getOptions(name: keyof IEntityFieldOptions);


  setOptions(options: IEntityFieldOptions);

  isEmpty(): boolean;
}

export interface IEntity {
  readonly entityId: string;
  readonly label: string;
  readonly source: string;
  readonly values?: IKeyValueList<any>;
  deleted?: EEntityDeleted;
  is_new?: boolean;

  setFieldValue(fieldName: string, value: any);

  hasField(fieldName: string): boolean;

  field(fieldName: string): IEntityField;

  fieldValue(fieldName: string);

  cleanId();

  addAttribute(name: string, value: any, type: string): void;

  addRelationship(name: string, value: IEntity): void;

  clone();
}
export interface IEntityField {
  name: string;
  type: TEntityFieldType;

  getValue<T extends any | IEntity>(): T;

  getOptions(name: keyof IEntityFieldOptions);


  setOptions(options: IEntityFieldOptions);

  isEmpty(): boolean;
}
