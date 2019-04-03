


import { IEntityStates, IState, TEntityStatusList, TStatus, StateRecord } from '@xangular-store/entity/types';
import { IUser } from '../types';
import * as Immutable from 'immutable';

export namespace StoreState {
  export const featureName = 'USER';


  export interface IUserStates extends IEntityStates {
    entity?: IUser;
  }

  export type TUserStatusList = TEntityStatusList | 'LOGIN' | 'LOGOUT';

  export type TUserStatus = TStatus<TUserStatusList>;

  export type TStateUser = Immutable.RecordOf<IState<IUserStates>>


  export type State = TStateUser


  export const initialState: State = new StateRecord();

}
