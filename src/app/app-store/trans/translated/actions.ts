import { IEntityTranslated } from '../../../types/trans';
import { ELanguage } from '@app/types/common';

export namespace StoreActions {
  export enum Types {
    TRANSLATED_NEW = '[TRANSLATED] NEW',
    TRANSLATED_FIND = '[TRANSLATED] LOAD',
    TRANSLATED_LOAD_SUCCESS = '[TRANSLATED] LOAD_SUCCESFULL',
    TRANSLATED_LOAD_ERROR = '[TRANSLATED] LOAD_ERROR',
  }

  export class translatedNew {
    readonly type = Types.TRANSLATED_NEW;
    constructor(public entity: IEntityTranslated) { }
  }

  export class translatedFind {
    readonly type = Types.TRANSLATED_FIND;
    constructor(public userId: string, public originalId: string, public language: ELanguage) { }
  }

  export class translatedLoadSuccess {
    readonly type = Types.TRANSLATED_LOAD_SUCCESS;
    constructor(public entity: IEntityTranslated) { }
  }

  export class translatedLoadError {
    readonly type = Types.TRANSLATED_LOAD_ERROR;
    constructor(public entityId: string) { }
  }

  export type Actions = translatedNew | translatedFind | translatedLoadSuccess | translatedLoadError;
}
