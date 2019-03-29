
import { IEntity } from "@app-library/ng-http-service/entity/IEntity";

import { User } from './user.class';
import { ELanguage } from '@app-types/config';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs';
import { IEntityStatus } from '@app-library/xangular-store/entity/types';


export enum EUserRole {
  ANONIMUS = 'user-anonimus',
  AUTORISED = 'user-autorized',
}


export type TUserStatusName = keyof IUserStatus;

export interface IUser extends IEntity {
  role: EUserRole,
  label: string;
  language: ELanguage
}

export interface IMenuUpdate {
  role: EUserRole,
  items: MenuItem[]
}



export const Anonymus: IUser = new User('user', '0', {})
// {
//   entityId: '0',
//   role: EUserRole.ANONIMUS,
//   label: 'Anonymus',
//   source: 'user',
//   language: ELanguage.RU
// }

export interface IUserStatus extends IEntityStatus {
  LOGIN?: boolean;
  LOGOUT?: boolean;
}


export interface IUserService {
  onUID(): Observable<string>;
  onLoaded(): Observable<IUser>;
  onLogin(): Observable<IUser>;
  onLogout(): Observable<IUser>;
  onMenuUpdate(role: EUserRole): Observable<IMenuUpdate>;
  // on(eventType: EUserEvent): Observable<IUser>
}
