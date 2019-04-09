import {ISourceConfig} from '@app-library/app-config';
import {IEntity} from '@xangular-common/entity';
import {ELanguage, IFieldTypeLink} from '@app/types';
import {IUser} from '@app-library/user';


export interface ISourceEntityTranslate extends IEntity {
  title: string;
  created: string;
  changed: string;
  parent?: IEntity;
  author?: IEntity;
  sourceLink: IFieldTypeLink;
  template?: string;
  langcode?: ELanguage;
  lines?: Map<string, ILineEntity>;
}

export interface ISourceEntityTranslateLine extends IEntity {
  title: string;
  created: string;
  changed: string;
  author?: IEntity;
  langcode?: ELanguage;
  content?: string;
}

const translate: ISourceConfig<ISourceEntityTranslate> = {
  name: 'translate',
  url: 'translate',
  fields: {
    title: 'string',
    created: 'datatime',
    changed: 'datatime',
    parent: 'relationship',
    author: 'relationship',
    sourceLink: 'link',
    template: 'string',
    langcode: 'string',
    lines: 'array'
  }
};
const translate_line: ISourceConfig<ISourceEntityTranslateLine> = {
  name: 'translate-line',
  url: 'translate-line',
  fields: {
    title: 'string',
    created: 'datatime',
    changed: 'datatime',
    author: 'relationship',
    langcode: 'string',
  }
};
export const configs: ISourceConfig<ISourceEntityTranslate>[] = [translate, translate_line];


export interface ILineEntity extends IEntity {
  source: string;
  author?: IUser;
  langcode?: ELanguage;
  content: string;
}
