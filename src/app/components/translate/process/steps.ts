import { ELanguage } from '@app/types/common';
import { Action } from "@ngrx/store";
import { ITranslateEntityOriginal, ITranslateEntityTranslated, ITranslateEntity } from '@app/types';

export namespace Steps {

  export enum EStep {

    ORIGINAL_ID_COMPLETE = 'ORIGINAL_ID_COMPLETE',
    ORIGINAL_LOADED = 'ORIGINAL_LOADED',
    TRANSLATE_LOADED = 'TRANSLATE_LOADED',
    TRANSLATE_CHANGED = 'TRANSLATE_CHANGED',
  }

  export class originalIdComplete implements Action {
    readonly type = EStep.ORIGINAL_ID_COMPLETE;
    constructor(public userId: string, public originalId: string, public language: ELanguage) { }
  }
  export class originalLoaded implements Action {
    readonly type = EStep.ORIGINAL_LOADED;
    constructor(public entity: ITranslateEntityOriginal) {
    }
  }

  export class translatedLoaded implements Action {
    readonly type = EStep.TRANSLATE_LOADED;
    constructor(public entity: ITranslateEntityTranslated) {
    }
  }

  export class translatedChanged implements Action {
    readonly type = EStep.TRANSLATE_CHANGED;
    constructor(public entity: ITranslateEntity) {
    }
  }



  export type TSteps =
    // ORIGINAL
    | originalIdComplete
    | originalLoaded
    // TRANSLATED
    | translatedLoaded
    | translatedChanged

}
