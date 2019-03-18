import { ELanguage } from './common';
import { EnumFlagged } from '@app/library/enum-flagged';
import { EOriginalStatus } from '@app/app-store/trans/original-status/actions';
import { ETranslatedStatus } from '@app/app-store/trans/translated-status/actions';

export enum ESources {
  SOURCE = 'translate-source',
  ORIGINAL = 'translate-original',
  TRANSLATED = 'translate-translated',
}

export interface IEntity {
  entityId: string | null,
  authorId: string,
}

/**
 *
 */
export interface ITranslatedLineEntity extends IEntity {
  // entityId: string,
  // authorId: string,
  transId: string, // ITranslateOriginalEntity entityId
  content: string,
  translated: boolean,
}

export interface IOriginalLineEntity extends IEntity {
  // entityId: string,
  // authorId: string,
  content: string,
}


export interface IOriginalEntity extends IEntity {
  // entityId: string,
  // authorId: string,
  language: ELanguage,
  lines: Map<string, IOriginalLineEntity>,
  template: string
}



export interface ISyncState {
  originalId: string,
  translatedId: string,
  lineId: string,
  originalScroll: number,
  translatedScroll: number,
}

export interface ITranslatedEntity extends IEntity {
  // entityId: string,
  // authorId: string,
  originalId: string,
  language: ELanguage,
  lines: Map<string, ITranslatedLineEntity>
}

export interface IEntityOriginalStatus {
  entityId: string,
  status: EnumFlagged<EOriginalStatus>
}

export interface IEntityTranslatedStatus {
  entityId: string,
  status: EnumFlagged<ETranslatedStatus>
}

export type TTranslateEntity = IOriginalEntity | ITranslatedEntity

export type TTranslateLineEntity = IOriginalLineEntity | ITranslatedLineEntity

export type TEntity = IOriginalEntity
  | ITranslatedEntity
  | IOriginalLineEntity
  | ITranslatedLineEntity;
