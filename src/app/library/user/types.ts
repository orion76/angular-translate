import {ELanguage} from '@app-types/config';
import {createEntity, IEntity} from '@xangular-common/entity';
import {MenuItem} from 'primeng/components/common/menuitem';
import {Observable} from 'rxjs';
import {StoreState as UserState} from './store';

import TStateUser = UserState.TStateUser;
import {sourceConfigUser} from '@app-library/user/source/source.config';

export enum EUserRole {
  ANONIMUS = 'user-anonimus',
  AUTORISED = 'user-autorized',
}


export interface IUser extends IEntity {
  name: string;
  langcode: ELanguage;
  user_picture: string;
}

export interface IMenuUpdate {
  role: EUserRole;
  items: MenuItem[];
}


export const UserAnonymus: IUser = createEntity<IUser>('user', null, sourceConfigUser.fields, {
  name: 'Anonymus',
  langcode: ELanguage.RU,
  user_picture: 'https://avatars0.githubusercontent.com/u/2338387'
});


export interface IUserService {


  onLoaded(): Observable<TStateUser>;

  onLogin(): Observable<TStateUser>;

  onLogout(): Observable<TStateUser>;

  getRole(user: IUser): EUserRole;

  // on(eventType: EUserEvent): Observable<IUser>
}
