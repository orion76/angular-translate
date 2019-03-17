import { EnumFlagged } from '@app-lib/enum-flagged';
import { EUserStatus } from '@app-store/trans/user-status/actions';
import { IUserStatus } from '@app-types/user';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export namespace StoreState {
  export const featureName = 'USER_STATUS';




  export interface State extends IUserStatus {

  }

  export const initialState: State = {
    uid: '0',
    status: new EnumFlagged<EUserStatus>(EUserStatus, EUserStatus.ANONYM),

  }
}
