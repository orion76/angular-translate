import { ELanguage } from '@app/types/config';
import { Observable } from 'rxjs';
import { IEntity } from '@app/types';

export interface IUser extends IEntity {

  name: string;
  language: ELanguage
}



// export interface IUserStatus extends IEntityStatus {
//   LOGIN: boolean,
// }

// export type TStatusName = keyof IUserStatus;

export interface IUserService {
  onUID(): Observable<string>;
  onLoaded(): Observable<IUser>;
  // on(eventType: EUserEvent): Observable<IUser>
}
