


import { IEntityStates, IState, TEntityStatusList, TStatus, StateRecord } from '@xangular-store/entity/types';
import { IUser } from '../types';
import * as Immutable from 'immutable';

export namespace StoreState {
  export const featureName = 'USER';


  export interface IUserState extends IEntityStates {
    entity?: IUser;
    status?: TUserStatus
  }

  export type TUserStasuses = TEntityStatusList | 'LOGIN' | 'LOGOUT';

  export type TUserStatus = TStatus<TUserStasuses>;

  export type State = Immutable.RecordOf<IState<IUserState>>


  export const initialState: State = new StateRecord();

}
