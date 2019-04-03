
import { ELanguage } from '@app-types/config';
import { createEntity, IEntity } from '@xangular-common/entity';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Observable } from 'rxjs';


export enum EUserRole {
  ANONIMUS = 'user-anonimus',
  AUTORISED = 'user-autorized',
}


export type TUserStatusName = keyof TUserStatus;

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




export interface IUserService {
  onUID(): Observable<string>;
  onLoaded(): Observable<IUser>;
  onLogin(): Observable<IUser>;
  onLogout(): Observable<IUser>;
  // on(eventType: EUserEvent): Observable<IUser>
}
