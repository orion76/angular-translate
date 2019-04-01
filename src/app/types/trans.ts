

import { IEntity } from '@xangular-common/entity/types';
import { ELanguage } from '@app/types/config';




export interface IEntityTranslate extends IEntity {
  parentId?: string,
  authorId?: string,
  template?: HTMLElement;
  language?: ELanguage;
  lines?: Map<string, ILineEntity>;
}



export interface ILineEntity extends IEntity {
  source: string,
  authorId?: string,
  language?: ELanguage,
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
