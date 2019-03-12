import { ELanguage } from './common';
import { EnumFlagged } from '../library/enum-flagged';
import { EOriginalStatus } from '../app-store/trans/original-status/actions';

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


export interface ITranslateOriginalEntity extends IEntity {
  // entityId: string,
  // authorId: string,
  language: ELanguage,
  lines: Map<string, IOriginalLineEntity>,
  template: string
}

export interface ITranslateTranslatedEntity extends IEntity {
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

export type TEntity = ITranslateOriginalEntity
  | ITranslateTranslatedEntity
  | IOriginalLineEntity
  | ITranslatedLineEntity;
