import { IOriginalEntity } from '../../../types/trans';
import { IUser } from '@app-types/user';

export enum EUserStatus {
  ANONYM = 1 << 0,
  LOGGED = 1 << 1,
  LOAD = 1 << 2,
  LOAD_SUCCESS = 1 << 3,
  LOAD_ERROR = 1 << 4,
}



export namespace StoreActions {
  export enum Types {
    LOGIN = '[USER STATUS] LOGIN',
    LOAD = '[USER STATUS] LOAD',
    LOAD_SUCCESS = '[USER STATUS] LOAD_SUCCESFULL',
    LOAD_ERROR = '[USER STATUS] LOAD_ERROR',
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
