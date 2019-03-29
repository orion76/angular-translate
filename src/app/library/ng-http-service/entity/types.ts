import { IEntity } from './IEntity';

export type TEntityFieldType = 'attribute' | 'relationship';


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


export interface IEntityField {
  name: string;
  type: TEntityFieldType;

  getValue<T extends any | IEntity>(): T;

  getOptions(name: keyof IEntityFieldOptions);


  setOptions(options: IEntityFieldOptions);

  isEmpty(): boolean;
}
