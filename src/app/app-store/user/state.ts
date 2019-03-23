
import { EEntityType, ELanguage } from '@app/types';
import { IUser } from '@app/types/user';
import { IEntityStatus, IStateTranslated, IStateUser } from '@app-library/store/types';
import { EntityState } from '@ngrx/entity';


export namespace StoreState {
  export const featureName = 'USER';

  export const initialState: State = {
    stateId: '0',
    entity: {
      type: EEntityType.user,
      entityId: '0',
      name: 'anonym',
      language: ELanguage.RU
    }
  };
  export interface State extends IStateUser { }
}
