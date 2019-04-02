


import { IEntityStates, IStateEntity, IState, IEntityStatus } from '@xangular-store/entity/types';
import { Anonymus, IUser, IUserStatus } from '../types';


export namespace StoreState {
  export const featureName = 'USER';


  export interface IUserState extends IEntityStates {
    entity?: IUser;
    status?: IUserStatus
  }

  export interface IUserStatus extends IEntityStatus {

  }

  export interface State extends IState<IUserState, IUserStatus> {

  }

  export const initialState: State = {
    stateId: '0',
    data: null,
    counts: {},
    status: {}
  };

}
