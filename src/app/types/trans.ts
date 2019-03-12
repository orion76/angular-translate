import { ELanguage } from './common';

export enum ESources {
  SOURCE = 'translate-source',
  ORIGINAL = 'translate-original',
  TRANSLATED = 'translate-translated',
}

export interface IEntity {
  entityId: string,
  authorId: string,
}

export interface ITranslatedEntity extends IEntity {
  sourceId: string,
  transId: string, // ITranslateOriginalEntity entityId
  language: ELanguage,
  content: string,
  translated: boolean,
}

export interface ITranslateOriginalEntity extends IEntity {
  sourceId: string,
  language: ELanguage,
  content: string,
}

export interface ITranslateSourceEntity extends IEntity {
  language: ELanguage,
  items: Map<string, ITranslateOriginalEntity>
}

export interface ITranslateedEntityList {
  sourceId: string,
  language: ELanguage,
  items: Map<string, ITranslateOriginalEntity>
}

