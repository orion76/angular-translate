import { ITranslatedEntity } from '../../../types/trans';
import { ELanguage } from '@app/types/common';

export namespace StoreActions {
  export enum Types {
    ADD_STATE = '[TRANSLATE SYNC] ADD_STATE',
    SELECT_TRANSLATE_LINE = '[TRANSLATE SYNC] SELECT_TRANSLATE_LINE',
    SCROLL_ORIGINAL = '[TRANSLATE SYNC] LOAD',
    SCROLL_TRANSLATED = '[TRANSLATE SYNC] LOAD_SUCCESFULL',
  }

  export class addState {
    readonly type = Types.ADD_STATE;
    constructor(public originalId: string) { }
  }

  export class selectTranslateLine {
    readonly type = Types.SELECT_TRANSLATE_LINE;
    constructor(public originalId: string, public transId: string) { }
  }

  export class scrollOriginal {
    readonly type = Types.SCROLL_ORIGINAL;
    constructor(public originalId: string, public scroll: number) { }
  }


  export class scrollTranslated {
    readonly type = Types.SCROLL_TRANSLATED;
    constructor(public originalId: string, public scroll: number) { }
  }



  export type Actions = addState | selectTranslateLine | scrollOriginal | scrollTranslated;
}