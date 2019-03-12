import { ITranslateSourceEntity } from '../../../types/trans';

export namespace StoreActions {
  export enum Types {
    NEW_SOURCE = 'NEW_SOURCE',
    LOAD_SOURCE = 'ADD_SOURCE',
    LOAD_SOURCE_SUCCESS = 'LOAD_SOURCE_SUCCESFULL',
    LOAD_SOURCE_ERROR = 'LOAD_SOURCE_ERROR',
  }

  export class newSource {
    readonly type = Types.NEW_SOURCE;
    constructor(public entity: ITranslateSourceEntity) { }
  }

  export class loadSource {
    readonly type = Types.LOAD_SOURCE;
    constructor(public entityId: string) { }
  }

  export class loadSourceSuccess {
    readonly type = Types.LOAD_SOURCE_SUCCESS;
    constructor(public entity: ITranslateSourceEntity) { }
  }

  export class loadSourceError {
    readonly type = Types.LOAD_SOURCE_ERROR;
    constructor(public entityId: string) { }
  }

  export type Actions = newSource | loadSource | loadSourceSuccess | loadSourceError;
}
