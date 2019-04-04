import { Inject, Injectable, InjectionToken } from "@angular/core";
import { APP_CONFIG_SERVICE, IAppConfigService } from '@app-library/app-config';
import { IAuthPlugin, IUserAuthService } from '@app-library/user/auth/types';
import { IAppState } from '@app-store/app-store.module';
import { Store } from '@ngrx/store';
import { StoreSelectors as UserSelectors, StoreActions as UserActions, StoreState } from '../store';
import { take } from 'rxjs/operators';
export const USER_AUTH_SERVICE = new InjectionToken<IUserAuthService>('USER_AUTHSERVICE');
export const AUTH_PLUGIN = new InjectionToken<IAuthPlugin>('AUTH_PLUGIN');

@Injectable()
export class UserAuthService implements IUserAuthService {

  selectors = UserSelectors.selectors;
  constructor(
    private store: Store<IAppState>,
    @Inject(AUTH_PLUGIN) private plugin: IAuthPlugin,
    @Inject(APP_CONFIG_SERVICE) protected config: IAppConfigService,
  ) {

  }

  login(username: string, password: string) {
    this.plugin.login(username, password).subscribe((authData: any) => {
      this.store.dispatch(new UserActions.Authenticate(authData));
    });
    this.store.pipe(
      this.selectors.isStatus({ AUTHENTICATED: true }),
      take(1)
    ).subscribe((state: StoreState.TStateUser) => {
      this.store.dispatch(new UserActions.Add({ source: 'user', id: username }));
    })
  }

  createUrl(path: string) {
    return `/${path}`;
  }
}
