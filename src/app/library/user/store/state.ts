


import { IStateEntity } from '@xangular-store/entity/types';
import { Anonymus, IUser, IUserStatus } from '../types';


export namespace StoreState {
  export const featureName = 'USER';


  export interface IStateUser extends IStateEntity {
    entity?: IUser;
    status?: IUserStatus
  }

  export interface State extends IStateUser {

  }

  export const initialState: State = {
    stateId: '0',
    entity: Anonymus,
    status: {}
  };

}
