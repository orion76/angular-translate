import { IUser } from '@app-types/user';

export namespace StoreActions {
  export enum Types {
    LOGIN = '[USER] LOGIN',
    LOAD = '[USER] LOAD',
    LOAD_SUCCESS = '[USER] LOAD_SUCCESFULL',
    LOAD_ERROR = '[USER] LOAD_ERROR',
  }

  export class Login {
    readonly type = Types.LOGIN;
    constructor(public entity: IUser) { }
  }

  export class Load {
    readonly type = Types.LOAD;
    constructor(public uid: string) { }
  }

  export class LoadSuccess {
    readonly type = Types.LOAD_SUCCESS;
    constructor(public entity: IUser) { }
  }

  export class LoadError {
    readonly type = Types.LOAD_ERROR;
    constructor(public uid: string) { }
  }

  export type Actions = Login | Load | LoadSuccess | LoadError;
}
