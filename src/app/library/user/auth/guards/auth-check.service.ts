import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IAuthData, IUserAuthService, USER_AUTH_SERVICE} from '@app-library/user/auth';


@Injectable()
export class GuardAuthCheckService implements CanActivate {

  constructor(@Inject(USER_AUTH_SERVICE) private service: IUserAuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    // this.service.isLogged().subscribe((logged: boolean) => {
    //   if (logged) {
    //     return;
    //   }
    //
    //   const authData: IAuthData<any> = this.service.fromLocalStorage();
    //   if (authData) {
    //     // this.service._restoreFromStorage(authData.username, authData.data);
    //   }
    // });

    return true;
  }

}
