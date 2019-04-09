import {Inject, Injectable} from '@angular/core';
import {EUserRole, IUser, IUserService, UserAnonymus} from '@app-library/user/types';
import {IMenuState} from '@app-library/menu-main/store/types';
import {StoreState} from '@app-library/user/store';
import {USER_SERVICE} from '@app-library/user/user.service';
import TStateUser = StoreState.TStateUser;
import {IMenuMainService, IMenuModuleService} from '@app-library/menu-main/types';

@Injectable()
export class UserMenuService implements IMenuModuleService {
  loginMenuId = 'log-in-out';

  constructor(@Inject(USER_SERVICE) private user: IUserService) {

  }

  init(main: IMenuMainService) {
    main.add(this.getInOutMenu(EUserRole.ANONIMUS, UserAnonymus));
    this.user.onLogin().subscribe((state: TStateUser) => {
      const user = state.data.entity;
      main.add(this.getUserMenu(user));
      main.add(this.getInOutMenu(EUserRole.AUTORISED, user));

    });

    this.user.onLogout().subscribe((state: TStateUser) => {
      const user = state.data.entity;

      main.add(this.getInOutMenu(EUserRole.ANONIMUS, user));
      main.delete(this.getUserMenu(user));

    });
  }

  getUserMenu(user: IUser): IMenuState[] {


    return [
      {
        item: {label: user['name'], routerLink: '/user', weight: 900},
        menuName: 'main-right', path: [], id: 'user',
      },
      // {
      //   item: {label: user.label, routerLink: '/user/login'},
      //   place: 'right', path: [], id: 'user', weight: 1000,
      // }
    ];
  }

  getInOutMenu(role: EUserRole, user: IUser) {
    let menu: IMenuState[] = [];


    switch (this.user.getRole(user)) {
      case EUserRole.ANONIMUS:

        menu = [{
          item: {label: 'Login', routerLink: '/user/login', weight: 1000},
          menuName: 'main-right', path: [], id: this.loginMenuId,
        }];
        break;
      case EUserRole.AUTORISED:

        menu = [{
          item: {label: 'Logout', routerLink: '/user/logout', weight: 1000},
          menuName: 'main-right', path: [], id: this.loginMenuId,
        }];
        break;
    }
    return menu;
  }

}
