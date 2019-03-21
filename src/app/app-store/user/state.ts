
import { EEntityType, ELanguage } from '@app/types';
import { IUser, IUserStatus } from '@app/types/user';


export namespace StoreState {
  export const featureName = 'USER';

  export const initialState: State = {
    entity: {
      type: EEntityType.user,
      entityId: '0',
      name: 'anonym',
      language: ELanguage.RU
    },
    status: {
      ADD: false,
      LOAD: false,
      LOGIN: false,
      LOAD_SUCCESS: false,
      LOAD_ERROR: false,
    }

  };
  export interface State {
    entity: IUser,
    status: IUserStatus
  }
}
