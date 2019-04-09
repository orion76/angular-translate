import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IEntity} from '@xangular-common/entity';
import {ISourceConfig} from '@app-library/app-config';
import {FormGroup} from '@angular/forms';
import {IEntityRequest} from '@xangular-store/entity/types';

export type UFieldValueTypes = 'string' | 'data' | 'time' | 'datatime' | 'number' | 'link' | 'relationship' | 'array';


export interface IFormFieldType {
  // type: UFieldTypes;
  name: UFieldValueTypes;
  empty: any;
  value?: string[];
  view?: string[];
  fields?: TFormFields;
}

export interface TFormFields {
  [key: string]: UFieldValueTypes;
}

export type TEntityFields<T> = { [key in keyof T]?: UFieldValueTypes };

export const FormFields: { [key in UFieldValueTypes]: IFormFieldType } = {
  string: {
    name: 'string',
    empty: null
  },
  number: {
    name: 'number',
    empty: null
  },
  data: {
    name: 'data',
    empty: null
  },
  time: {
    name: 'time',
    empty: null
  },
  datatime: {
    name: 'datatime',
    empty: null
  },
  link: {
    name: 'link',
    value: ['uri'],
    view: ['title'],
    fields: {
      uri: 'string',
      title: 'string',
    },
    empty: {uri: null, title: null}
  },
  relationship: {
    name: 'relationship',
    value: ['id'],
    view: ['title'],
    fields: {
      id: 'string',
      type: 'string',
      title: 'string'
    },
    empty: {
      id: null,
      type: null,
      title: null
    }
  },
  array: {
    name: 'array',
    empty: null
  }
};


export interface IFormService {
  getId(route: ActivatedRoute): Observable<string>;

  // getRequest(route: ActivatedRoute): Observable<IEntityRequest>;

  getEntity<T extends IEntity>(config: ISourceConfig<T>, id: string): Observable<T>;

  newEntity(config: ISourceConfig<any>, fields?: any): IEntity;

  createForm(): FormGroup;

  addControls<E>(form: FormGroup, fields: TEntityFields<E>);

  getSource<T extends IEntity>(name: string): Observable<ISourceConfig<T>>;
}
