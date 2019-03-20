import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EUserEvent, IUser, IUserEvent, IUserService } from '../types/user';
import { ELanguage } from '@app/types/common';


@Injectable()
export class UserService implements IUserService {
  private _UserSubject: BehaviorSubject<IUserEvent> = new BehaviorSubject(null);

  private onEvent$: Observable<IUserEvent> = this._UserSubject.asObservable();


  constructor() {
    this.init();
  }


  init() {
    this._UserSubject.next({
      type: EUserEvent.UID, entityId: '0', name: 'anonym', language: ELanguage.RU
    })

    this._UserSubject.next({
      type: EUserEvent.LOADED, entityId: '111', name: 'pasha', language: ELanguage.RU
    })
  }

  onUID(): Observable<string> {
    return this.on(EUserEvent.UID);
  }

  public on(eventType: EUserEvent): Observable<any> {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((event: IUserEvent) => event.type === eventType),
    )
  }

  public onLoaded(): Observable<IUser> {
    return this.on(EUserEvent.LOADED);
  }

  public do(eventType: EUserEvent, user: IUser): void {
    this._UserSubject.next({ type: eventType, ...user })
  }

}
