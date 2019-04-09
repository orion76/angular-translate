import {Inject, Injectable, InjectionToken} from '@angular/core';
import {APP_CONFIG_SERVICE, IAppConfigService} from '@app-library/app-config';
import {IAuthData, IAuthPlugin, IUserAuthService} from './types';
import {IAppState} from '@app-store/app-store.module';
import {Store} from '@ngrx/store';
import {StoreState} from '../store/state';
import {StoreActions as UserActions} from '../store/actions';
import {StoreSelectors as UserSelectors} from '../store/selectors';
import {filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {EFilterOperator, IEntityRequest} from '@xangular-store/entity/types';
import {HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


export const USER_AUTH_SERVICE = new InjectionToken<IUserAuthService>('USER_AUTH_SERVICE');
export const AUTH_PLUGIN = new InjectionToken<IAuthPlugin>('AUTH_PLUGIN');

const localstorageKey = 'AuthData';

import TStateUser = StoreState.TStateUser;

@Injectable()
export class UserAuthService implements IUserAuthService {

  selectors = UserSelectors.selectors;

  constructor(
    private store: Store<IAppState>,
    @Inject(AUTH_PLUGIN) private plugin: IAuthPlugin,
    @Inject(APP_CONFIG_SERVICE) protected config: IAppConfigService,
  ) {

  }

  restoreFromStorage() {
    this.isLogged().subscribe((logged: boolean) => {
      if (logged) {
        return;
      }

      const authData: IAuthData<any> = this.fromLocalStorage();
      if (!authData.data) {
        debugger;
      }
      if (authData) {
        this._restoreFromStorage(authData);
      }
    });
  }

  _restoreFromStorage(authData: IAuthData<any>) {
    const request = this._createRequest(authData.username);

    this.store.dispatch(new UserActions.Add(request));

    this.store.pipe(
      this.selectors.isStatus({REQUEST: true}),
      take(1),
      // tap(() => console.log('1111', authData)),
      switchMap(() => {
        this.store.dispatch(new UserActions.Authenticate(authData));
        return this.store.pipe(
          this.selectors.isStatus({AUTHENTICATED: true}));
      }),
      // take(1),

      tap((state: TStateUser) => this.store.dispatch(new UserActions.LOAD(state.data.request))),
      switchMap(() => this.store.pipe(this.selectors.isStatus({LOAD_SUCCESS: true}))),

      tap(() => this.store.dispatch(new UserActions.Login())),
      switchMap(() => this.store.pipe(this.selectors.isStatus({LOGIN: true}))),

      take(1)
    ).subscribe(() => true);
  }

  login(username: string, password: string) {

    const request = this._createRequest(username);

    this.store.dispatch(new UserActions.Add(request));

    this.store.pipe(
      this.selectors.isStatus({REQUEST: true}),
      take(1),

      switchMap(() => {
        return this.plugin.login(username, password).pipe(
          map((data: any) => ({username, data})),
          tap((authData: IAuthData<any>) => this.store.dispatch(new UserActions.Authenticate(authData))),
          switchMap(() => this.store.pipe(
            this.selectors.isStatus({AUTHENTICATED: true}))
          )
        );
      }),
      take(1),

      tap((state: TStateUser) => this.store.dispatch(new UserActions.LOAD(state.data.request))),
      switchMap(() => this.store.pipe(this.selectors.isStatus({LOAD_SUCCESS: true}))),
      tap(() => this.store.dispatch(new UserActions.Login())),
      switchMap(() => this.store.pipe(this.selectors.isStatus({LOGIN: true}))),

      take(1)
    ).subscribe((req) => console.log('[LOGGED]', req));
  }

  auth(req: HttpRequest<any>): Observable<HttpRequest<any>> {

    return this.store.pipe(
      this.selectors.data,
      tap((data: StoreState.IUserStates) => {
        // console.log('[AUTH DATA]', data);
      }),
      map((data: StoreState.IUserStates) => data.authData),
      map((authData: any) => this.plugin.auth(req, authData.data)),
      take(1)
    );
  }

  onLogin(): Observable<TStateUser> {
    return this.store.pipe(
      this.selectors.isStatus({LOGIN: true}),
      take(1)
    );
  }

  onLogout(): Observable<TStateUser> {
    return this.store.pipe(
      this.selectors.isStatus({LOGOUT: true}),
      take(1)
    );
  }

  isLogged(): Observable<boolean> {
    return this.store.pipe(
      this.selectors.status('LOGIN')
    );
  }

  toLocalStorage(data: IAuthData<any>) {
    if (!data.data) {
      debugger;
    }
    localStorage.setItem(localstorageKey, JSON.stringify(data));
  }

  fromLocalStorage<T>(): T {
    const authData = localStorage.getItem(localstorageKey);
    if (authData) {
      return JSON.parse(authData);
    }

  }

  private _createRequest(username: string): IEntityRequest {
    return {
      source: 'user',
      filters: [
        {
          name: 'user-name',
          condition: {
            path: ['name'],
            operator: EFilterOperator.EQUAL,
            value: username
          }
        }
      ]
    };
  }

}
