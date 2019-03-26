
import { ILoad, ILoadError, ILoadSuccess, IRequest } from '@app-library/store/entity/actions';
import { IEntityRequest } from '@app-library/store/types';
import { Action } from '@ngrx/store';
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


  export class REQUEST implements IRequest<IEntityRequest> {
    readonly type = Types.REQUEST
    constructor(public request: IEntityRequest) { }
  }

  export class LOAD implements ILoad<IEntityRequest> {
    readonly type = Types.LOAD
    constructor(public request: IEntityRequest) { }
  }


  export class LOAD_SUCCESS implements ILoadSuccess<IUser> {
    readonly type = Types.LOAD_SUCCESS
    constructor(public entity: IUser) { }
  }

  export class LOAD_ERROR implements ILoadError {
    readonly type = Types.LOAD_ERROR
    constructor(public request: IEntityRequest) { }
  }

  export type Actions = LOGIN | LOGOUT | REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
