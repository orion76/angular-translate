
import { Action } from '@ngrx/store';
import { EntityActions } from '@xangular-store/entity/actions';
import { IEntityRequest } from '@xangular-store/entity/types';
import { IUser } from '../types';

export namespace StoreActions {

  export enum Types {
    LOGIN = '[USER] LOGIN',
    LOGOUT = '[USER] LOGOUT',
    REQUEST = '[USER] REQUEST',
    LOAD = '[USER] LOAD',
    LOAD_SUCCESS = '[USER] LOAD_SUCCESS',
    LOAD_ERROR = '[USER] LOAD_ERROR',
  }


  export class LOGIN implements Action {
    readonly type = Types.LOGIN
    constructor() { }
  }

  export class LOGOUT implements Action {
    readonly type = Types.LOGOUT
    constructor() { }
  }


  export class REQUEST implements EntityActions.IRequest{
    readonly type = Types.REQUEST
    constructor(public request: IEntityRequest) { }
  }

  export class LOAD implements EntityActions.ILoad {
    readonly type = Types.LOAD
    constructor(public request: IEntityRequest) { }
  }


  export class LOAD_SUCCESS implements EntityActions.ILoadSuccess {
    readonly type = Types.LOAD_SUCCESS
    constructor(public entity: IUser) { }
  }

  export class LOAD_ERROR implements EntityActions.ILoadError {
    readonly type = Types.LOAD_ERROR
    constructor(public request: IEntityRequest) { }
  }

  export type Actions = LOGIN | LOGOUT | REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
