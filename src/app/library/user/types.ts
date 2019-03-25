import { IEntity } from '@app-types/common';
import { ELanguage, EEntityType } from '@app-types/config';
import { Observable } from 'rxjs';
import { IEntityStatus } from '@app-library/store/types';
import { MenuItem } from 'primeng/components/common/menuitem';


export enum EUserRole {
  ANONIMUS = 'user-anonimus',
  AUTORISED = 'user-autorized',
}


export type TUserStatusName = keyof IUserStatus;

export interface IUser extends IEntity {
  role: EUserRole,
  name: string;
  language: ELanguage
}

export interface IMenuUpdate {
  role: EUserRole,
  items: MenuItem[]
}

export const Anonymus: IUser = {
  entityId: '0',
  role: EUserRole.ANONIMUS,
  name: 'Anonymus',
  type: EEntityType.user,
  language: ELanguage.RU
}

export interface IUserStatus extends IEntityStatus {
  LOGIN?: boolean;
  LOGOUT?: boolean;
}


export interface IUserService {
  onUID(): Observable<string>;
  onLoaded(): Observable<IUser>;
  onLogin(): Observable<IUser>;
  onLogout(): Observable<IUser>;
  onMenuUpdate(role: EUserRole): Observable<IMenuUpdate> ;
  // on(eventType: EUserEvent): Observable<IUser>
}
