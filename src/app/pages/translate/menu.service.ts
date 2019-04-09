import {Inject, Injectable} from '@angular/core';
import {IUserService} from '@app-library/user/types';
import {IMenuState} from '@app-library/menu-main/store/types';
import {USER_SERVICE} from '@app-library/user/user.service';
import {IMenuMainService, IMenuModuleService} from '@app-library/menu-main/types';
import {StoreState} from '@app-library/user/store';
import TStateUser = StoreState.TStateUser;


@Injectable()
export class TranslateMenuService implements IMenuModuleService {
  menuId = 'user-translation';

  constructor(@Inject(USER_SERVICE) private user: IUserService) {

  }

  getUserMenu(): IMenuState[] {
    return [
      {
        id: this.menuId, path: ['user'], menuName: 'main-right', item: {
          label: 'Translate', routerLink: 'user/translate', weight: 0
        }
      }
    ];
  }

  init(menuMain: IMenuMainService) {

    this.user.onLogin().subscribe((state: TStateUser) => {
      menuMain.add(this.getUserMenu());

    });

    this.user.onLogout().subscribe((state: TStateUser) => {

      menuMain.delete(this.getUserMenu());

    });
  }


}
