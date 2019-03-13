import { ITranslateOriginalEntity } from '../../../types/trans';

export namespace StoreActions {
  export enum Types {
    ORIGINAL_NEW = '[ORIGINAL] NEW',
    ORIGINAL_LOAD = '[ORIGINAL] LOAD',
    ORIGINAL_LOAD_SUCCESS = '[ORIGINAL] LOAD_SUCCESFULL',
    ORIGINAL_LOAD_ERROR = '[ORIGINAL] LOAD_ERROR',
  }

  export class originalNew {
    readonly type = Types.ORIGINAL_NEW;
    constructor(public entity: ITranslateOriginalEntity) { }
  }

  export class originalLoad {
    readonly type = Types.ORIGINAL_LOAD;
    constructor(public entityId: string) { }
  }

  export class originalLoadSuccess {
    readonly type = Types.ORIGINAL_LOAD_SUCCESS;
    constructor(public entity: ITranslateOriginalEntity) { }
  }

  export class originalLoadError {
    readonly type = Types.ORIGINAL_LOAD_ERROR;
    constructor(public entityId: string) { }
  }

  export type Actions = originalNew | originalLoad | originalLoadSuccess | originalLoadError;
}
