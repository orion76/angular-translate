import { IEntity } from '@app-types/common';
import { ELanguage, EEntityType } from '@app-types/config';
import { Observable } from 'rxjs';
import { IEntityStatus } from '@app-library/store/types';


export enum EUserRole {
  ANONIMUS = 'user-anonimus',
  AUTORISED = 'user-autorized',
}


export type TUserStatusName = keyof IUserStatus;

export interface IUser extends IEntity {
  name: string;
  language: ELanguage
}

export const Anonymus: IUser = {
  entityId: '0',
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
  // on(eventType: EUserEvent): Observable<IUser>
}
