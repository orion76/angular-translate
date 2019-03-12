import { ITranslateOriginalEntity } from '../../../types/trans';
import { EnumFlagged } from '../../../library/enum-flagged';


export enum EOriginalStatus {
  ORIGINAL_NEW = 1 << 0,
  ORIGINAL_LOAD = 1 << 1,
  ORIGINAL_LOAD_SUCCESS = 1 << 2,
  ORIGINAL_LOAD_ERROR = 1 << 3,
}

export namespace StoreActions {
  export enum Types {
    ORIGINAL_NEW = '[STATUS] ORIGINAL_NEW',
    ORIGINAL_LOAD = '[STATUS] ORIGINAL_LOAD',
    ORIGINAL_LOAD_SUCCESS = '[STATUS] ORIGINAL_LOAD_SUCCESS',
    ORIGINAL_LOAD_ERROR = '[STATUS] ORIGINAL_LOAD_ERROR',
  }

  export class originalNew {
    readonly type = Types.ORIGINAL_NEW;
    constructor(public entityId: string) { }
  }

  export class originalLoad {
    readonly type = Types.ORIGINAL_LOAD;
    constructor(public entityId: string) { }
  }

  export class originalLoadSuccess {
    readonly type = Types.ORIGINAL_LOAD_SUCCESS;
    constructor(public entityId: string) { }
  }

  export class originalLoadError {
    readonly type = Types.ORIGINAL_LOAD_ERROR;
    constructor(public entityId: string) { }
  }

  export type Actions = originalNew
    | originalLoad
    | originalLoadSuccess
    | originalLoadError;
}
