import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EUserEvents, IUser, IUserEvent, IUserService } from '../types/user';


@Injectable()
export class UserService implements IUserService {
  private _UserSubject: BehaviorSubject<IUserEvent> = new BehaviorSubject(null);

  private onEvent$: Observable<IUserEvent> = this._UserSubject.asObservable();

  public on(eventType: EUserEvents): Observable<IUser> {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((event: IUserEvent) => event.type === eventType),
      map((event: IUserEvent) => event.user)
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }

  public do(eventType: EUserEvents, user: IUser): void {
    this._UserSubject.next({ type: eventType, user })
  }

}
