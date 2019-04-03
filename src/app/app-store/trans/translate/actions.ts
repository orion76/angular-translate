
import { IEntityTranslate } from '../../../types/trans';

import { IEntityRequest, TEntityStatusList, TStatus } from '@xangular-store/entity/types';
import { EntityActions } from '@xangular-store/entity/actionsMany';

export type TTranslateStatuses = TEntityStatusList | 'SET_PARENT';

export type TTranslateStatus = TStatus<TTranslateStatuses>

export type TStatusName = keyof TTranslateStatus;

export namespace StoreActions {

  export enum Types {
    ADD_REQUEST = '[TRANSLATE] REQUEST',
    LOAD = '[TRANSLATE] LOAD',
    LOAD_SUCCESS = '[TRANSLATE] LOAD_SUCCESS',
    LOAD_ERROR = '[TRANSLATE] LOAD_ERROR',

    SET_PARENT = '[TRANSLATE] SET_PARENT',
  }

  export class Add implements EntityActions.IAdd {
    readonly type: Types.ADD_REQUEST
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

  export type Actions = Add | LOAD | LOAD_SUCCESS | LOAD_ERROR
    | SET_PARENT;
}
