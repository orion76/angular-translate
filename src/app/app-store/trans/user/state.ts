import { ELanguage, IUser } from '@app/types';

export namespace StoreState {
  export const featureName = 'USER';

  export interface State extends IUser { }

  export const initialState: State = {
    uid: '0',
    name: 'anonym',
    language: ELanguage.RU
  };
}
