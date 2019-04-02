
import { IEntityTranslate } from '../../../types/trans';

import { IEntityRequest, IEntityStatus } from '@xangular-store/entity/types';
import { EntityActions } from '@xangular-store/entity/actionsMany';



export interface ITranslateStatus extends IEntityStatus {
  SET_PARENT: boolean
}

export type TStatusName = keyof ITranslateStatus;

export namespace StoreActions {

  export enum Types {
    REQUEST = '[TRANSLATE] REQUEST',
    LOAD = '[TRANSLATE] LOAD',
    LOAD_SUCCESS = '[TRANSLATE] LOAD_SUCCESS',
    LOAD_ERROR = '[TRANSLATE] LOAD_ERROR',

    SET_PARENT = '[TRANSLATE] SET_PARENT',
  }

  export class REQUEST implements EntityActions.IRequest {
    readonly type: Types.REQUEST
    constructor(public stateId: string, public request: IEntityRequest) { }
  }

  export class LOAD implements EntityActions.ILoad {
    readonly type: Types.LOAD
    constructor(public stateId: string, public request: IEntityRequest) { }
  }


  export class LOAD_SUCCESS implements EntityActions.ILoadSuccess {
    readonly type: Types.LOAD_SUCCESS
    constructor(public stateId: string, public entity: IEntityTranslate) { }
  }

  export class LOAD_ERROR implements EntityActions.ILoadError {
    readonly type: Types.LOAD_ERROR
    constructor(public stateId: string, public request: IEntityRequest) { }
  }


  export class SET_PARENT implements EntityActions.ISetParent {
    readonly type: Types.SET_PARENT
    constructor(public stateId: string, public parent: IEntityTranslate) { }
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR
    | SET_PARENT;
}
