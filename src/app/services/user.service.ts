import { Injectable } from '@angular/core';
import { IAppState } from '@app/app-store/app-store.module';
import { StoreActions as UserActions, StoreSelectors as UserSelectors, IUserStatusProps } from '@app/app-store/user';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IUserService, IUser } from '../types/user';


@Injectable()
export class UserService implements IUserService {

  selectors: UserSelectors.IEntitySelectors;

  constructor(private store: Store<IAppState>) {
    this.selectors = UserSelectors.createSelectors();
    this.init();
  }


  init() {

    this.onUID().subscribe((entityId: string) => {
      this.store.dispatch(new UserActions.ADD(entityId));
    })



    // this._UserSubject.next({
    //   type: EUserEvent.UID, entityId: '0', name: 'anonym', language: ELanguage.RU
    // })

    // this._UserSubject.next({
    //   type: EUserEvent.LOADED, entityId: '111', name: 'pasha', language: ELanguage.RU
    // })
  }

  onUID(): Observable<string> {
    return of('111');
  }

  onLoaded(): Observable<IUser> {
    return this.store.pipe(this.selectors.entityStatus('LOAD_SUCCESS', true));
  }

  // public on(eventType: EUserEvent): Observable<any> {
  // return this.onEvent$.pipe(
  //   filter(Boolean),
  //   filter((event: IUserEvent) => event.type === eventType),
  // )
  // }

  // public onLoaded(): Observable<IUser> {
  // return this.on(EUserEvent.LOADED);
  // }

  // public do(eventType: EUserEvent, user: IUser): void {
  //   this._UserSubject.next({ type: eventType, ...user })
  // }

}
