import { IEnumFlagged } from '@app-lib/enum-flagged';
import { Observable } from 'rxjs';
import { ELanguage, IEntityStatus } from './common';


export enum EUserEvent {
  UID = 'UID COMPLETE',
  LOADED = 'LOADED'
}

export interface IUserEvent extends IUser {
  type: EUserEvent;

}

export interface IUser {
  entityId: string;
  name: string;
  language: ELanguage
}

export interface IUserStatus extends IEntityStatus {

}

export interface IUserService {
  onUID(): Observable<string>;
  onLoaded(): Observable<IUser>;
  on(eventType: EUserEvent): Observable<IUser>
}
