import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IOriginalEntity } from '../../../types/trans';
import { IUser } from '@app-types/user';
import { ELanguage } from '@app-types/common';

export namespace StoreState {
  export const featureName = 'USER';

  export interface State extends IUser { }

  export const initialState: State = {
    uid: '0',
    name: 'anonym',
    language: ELanguage.RU
  };
}
