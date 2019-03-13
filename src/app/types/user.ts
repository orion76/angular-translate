import { ELanguage } from './common';
import { Observable } from 'rxjs';

export enum EUserEvents {
  LOADED = 'LOADED'
}

export interface IUserEvent {
  type: EUserEvents;
  user: IUser
}

export interface IUser {
  userId: string;
  name: string;
  language: ELanguage
}

export interface IUserService {
  on(eventType: EUserEvents): Observable<IUser>
}
