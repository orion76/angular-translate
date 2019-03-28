

import { IEntityState } from '@app-library/xangular-store/entity/types';
import { Anonymus, IUserStatus } from '../types';


export namespace StoreState {
  export const featureName = 'USER';

  export const initialState: State = {
    stateId: '0',
    entity: Anonymus,
    status: {}
  };
  export interface State extends IEntityState {
    status: IUserStatus
  }
}
