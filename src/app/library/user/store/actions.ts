import {Action} from '@ngrx/store';

import {IEntityRequest} from '@xangular-store/entity/types';
import {IUser} from '../types';
import {EntityActions} from '@xangular-store/entity/actionsOne';

export namespace StoreActions {

  export enum Types {
    AUTHENTICATE = '[USER] AUTHENTICATE',
    LOGIN = '[USER] LOGIN',
    LOGOUT = '[USER] LOGOUT',
    REQUEST = '[USER] REQUEST',
    LOAD = '[USER] LOAD',
    LOAD_SUCCESS = '[USER] LOAD_SUCCESS',
    LOAD_ERROR = '[USER] LOAD_ERROR',
  }

  export class Authenticate implements Action {
    readonly type = Types.AUTHENTICATE;

    constructor(public authData: any) {
      if (!this.authData) {
        debugger;
      }
    }
  }

  export class Login implements Action {
    readonly type = Types.LOGIN;

    constructor() {
    }
  }

  export class Logout implements Action {
    readonly type = Types.LOGOUT;

    constructor() {
    }
  }


  export class Add implements EntityActions.IAdd {
    readonly type = Types.REQUEST;

    constructor(public request: IEntityRequest) {
    }
  }

  export class LOAD implements EntityActions.ILoad {
    readonly type = Types.LOAD;

    constructor(public request: IEntityRequest) {
    }
  }


  export class LoadSuccess implements EntityActions.ILoadSuccess {
    readonly type = Types.LOAD_SUCCESS;

    constructor(public entity: IUser) {
    }
  }

  export class LoadError implements EntityActions.ILoadError {
    readonly type = Types.LOAD_ERROR;

    constructor(public request: IEntityRequest) {
    }
  }

  export type Actions = Authenticate | Login | Logout | Add | LOAD | LoadSuccess | LoadError;
}
