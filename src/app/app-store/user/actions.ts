
import { ILoad, ILoadError, ILoadSuccess, IRequest } from '@app-library/store/entity/actions';
import { IRequestUser } from '@app-library/store/types';
import { IUser } from '@app-types/user';


export namespace StoreActions {

  export enum Types {
    REQUEST = '[USER] REQUEST',
    LOAD = '[USER] LOAD',
    LOAD_SUCCESS = '[USER] LOAD_SUCCESS',
    LOAD_ERROR = '[USER] LOAD_ERROR',
  }

  export class REQUEST implements IRequest<IRequestUser> {
    readonly type = Types.REQUEST
    constructor(public stateId: string, public request: IRequestUser) { }
  }

  export class LOAD implements ILoad<IRequestUser> {
    readonly type = Types.LOAD
    constructor(public stateId: string, public request: IRequestUser) { }
  }


  export class LOAD_SUCCESS implements ILoadSuccess<IUser> {
    readonly type = Types.LOAD_SUCCESS
    constructor(public stateId: string, public entity: IUser) { }
  }

  export class LOAD_ERROR implements ILoadError {
    readonly type = Types.LOAD_ERROR
    constructor(public stateId: string, public request: IRequestUser) { }
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
