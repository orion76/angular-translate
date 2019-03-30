
import { ELanguage } from '@app-types/config';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs';
import { IEntityStatus } from '@app-library/xangular-store/entity/types';
import { IEntity } from '@app-library/entity/types';
import { createEntity } from '@app-library/entity/entity';


export enum EUserRole {
  ANONIMUS = 'user-anonimus',
  AUTORISED = 'user-autorized',
}


export type TUserStatusName = keyof IUserStatus;

export interface IUser extends IEntity {
  role: EUserRole,
  label: string;
  language: ELanguage;
  avatar: string;
}

export interface IMenuUpdate {
  role: EUserRole,
  items: MenuItem[]
}



export const Anonymus: IUser = createEntity<IUser>('user', '0', {
  role: EUserRole.ANONIMUS,
  label: 'Anonymus',
  language: ELanguage.RU,
  avatar: 'https://avatars0.githubusercontent.com/u/2338387'
})


export interface IUserStatus extends IEntityStatus {
  LOGIN?: boolean;
  LOGOUT?: boolean;
}


export interface IUserService {
  onUID(): Observable<string>;
  onLoaded(): Observable<IUser>;
  onLogin(): Observable<IUser>;
  onLogout(): Observable<IUser>;
  // on(eventType: EUserEvent): Observable<IUser>
}
