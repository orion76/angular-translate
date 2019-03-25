
import { ELanguage, EEntityType } from '@app/types/config';
import { IEntityStatus } from '@app-library/store/types';
import { IEntity } from '@app-library/ng-http-service/entity/types';




export interface IEntityTranslate extends IEntity {
  authorId?: string,
  template?: HTMLElement;
  language?: ELanguage;
  lines?: Map<string, ILineEntity>;
}

export interface IEntityOriginal extends IEntityTranslate {
  type: EEntityType.original;
  lines?: Map<string, ILineEntityOriginal>;
}

export interface IEntityTranslated extends IEntityTranslate {
  originalId: string,
  type: EEntityType.translated;
  lines: Map<string, ILineEntityTranslated>;
}
export type TTranslateEntity = IEntityOriginal | IEntityTranslated;


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


export interface IOriginalStatus extends IEntityStatus {
}

export interface ITranslatedStatus extends IEntityStatus {

}

