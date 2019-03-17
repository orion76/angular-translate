import { ELanguage } from './common';
import { Observable } from 'rxjs';
import { EnumFlagged, IEnumFlagged } from '@app-lib/enum-flagged';
import { EUserStatus } from '@app-store/trans/user-status';

export enum EUserEvent {
  UID = 'UID COMPLETE',
  LOADED = 'LOADED'
}

export interface IUserEvent extends IUser {
  type: EUserEvent;

}

export interface IUser {
  uid: string;
  name: string;
  language: ELanguage
}

export interface IUserStatus {
  uid: string;
  status: IEnumFlagged<EUserStatus>
}

export interface IUserService {
  onUID(): Observable<string>;
  onLoaded(): Observable<IUser>;
  on(eventType: EUserEvent): Observable<IUser>
}
