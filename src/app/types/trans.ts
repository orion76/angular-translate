
import { IEntity } from '@app-library/ng-http-service/entity/types';
import { EEntityType, ELanguage } from '@app/types/config';




export interface IEntityTranslate extends IEntity {
  sourceId: 'original' | string
  authorId?: string,
  template?: HTMLElement;
  language?: ELanguage;
  lines?: Map<string, ILineEntity>;
}



export interface ILineEntity extends IEntity {
  type: EEntityType,
  content: string
}

export interface ISyncState {
  originalId: string,
  translatedId: string,
  lineIdPrev: string,
  lineId: string,
  originalScroll: number,
  translatedScroll: number,
}
