import { ELanguage, IEntityStatus } from './common';


export enum ESources {
  SOURCE = 'translate-source',
  ORIGINAL = 'translate-original',
  TRANSLATED = 'translate-translated',
}

export type TEntityType = 'original' | 'translated';

export interface IEntity {
  entityId: string,
  authorId: string,
  type: TEntityType
}

export interface ITranslateEntity extends IEntity {
  template: HTMLElement;
  language: ELanguage;
  lines: Map<string, ILineEntity>;
}

export interface ITranslateEntityOriginal extends ITranslateEntity {
  type: 'original';
  lines: Map<string, ILineEntity>;
}

export interface ITranslateEntityTranslated extends ITranslateEntity {
  originalId: string,
  type: 'translated';
  lines: Map<string, ILineEntity>;
}



export interface ILineEntity extends IEntity {
  type: TEntityType,
  content: string
}


export interface ILineEntityOriginal extends ILineEntity {

}

/**
 *
 */
export interface ILineEntityTranslated extends ILineEntity {
  transId: string, // ITranslateOriginalEntity entityId
  translated: boolean,
}



export interface ISyncState {
  originalId: string,
  translatedId: string,
  lineIdPrev: string,
  lineId: string,
  originalScroll: number,
  translatedScroll: number,
}

export interface IEntityOriginalStatus extends IEntityStatus {
}

export interface IEntityTranslatedStatus extends IEntityStatus {

}

