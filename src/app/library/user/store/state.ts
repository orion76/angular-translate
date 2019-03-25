
import { IStateUser } from '@app-library/store/types';
import { Anonymus } from '../types';


export namespace StoreState {
  export const featureName = 'USER';

  export const initialState: State = {
    stateId: '0',
    entity: Anonymus,
    status: {}
  };
  export interface State extends IStateUser { }
}
