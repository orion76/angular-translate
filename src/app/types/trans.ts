import { ELanguage, IEntityStatus } from './common';


export enum ESources {
  SOURCE = 'translate-source',
  ORIGINAL = 'translate-original',
  TRANSLATED = 'translate-translated',
}

export enum EEntityType { original, translated };

export interface IEntity {
  entityId: string,
  authorId: string,
  type: EEntityType
}

export interface ITranslateEntity extends IEntity {
  template: HTMLElement;
  language: ELanguage;
  lines: Map<string, ILineEntity>;
}

export interface IEntityOriginal extends ITranslateEntity {
  type: EEntityType.original;
  lines: Map<string, ILineEntity>;
}

export interface IEntityTranslated extends ITranslateEntity {
  originalId: string,
  type: EEntityType.translated;
  lines: Map<string, ILineEntity>;
}



export interface ILineEntity extends IEntity {
  type: EEntityType,
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

