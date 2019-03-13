import { ITranslateTranslatedEntity } from '../../../types/trans';

export namespace StoreActions {
  export enum Types {
    TRANSLATED_NEW = '[TRANSLATED] NEW',
    TRANSLATED_LOAD = '[TRANSLATED] LOAD',
    TRANSLATED_LOAD_SUCCESS = '[TRANSLATED] LOAD_SUCCESFULL',
    TRANSLATED_LOAD_ERROR = '[TRANSLATED] LOAD_ERROR',
  }

  export class translatedNew {
    readonly type = Types.TRANSLATED_NEW;
    constructor(public entity: ITranslateTranslatedEntity) { }
  }

  export class translatedLoad {
    readonly type = Types.TRANSLATED_LOAD;
    constructor(public entityId: string) { }
  }

  export class translatedLoadSuccess {
    readonly type = Types.TRANSLATED_LOAD_SUCCESS;
    constructor(public entity: ITranslateTranslatedEntity) { }
  }

  export class translatedLoadError {
    readonly type = Types.TRANSLATED_LOAD_ERROR;
    constructor(public entityId: string) { }
  }

  export type Actions = translatedNew | translatedLoad | translatedLoadSuccess | translatedLoadError;
}
