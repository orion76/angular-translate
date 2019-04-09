import {Inject, Injectable} from '@angular/core';
import {IUserService} from '@app-library/user/types';
import {USER_SERVICE} from '@app-library/user/user.service';
import {IMenuMainService, IMenuModuleService} from '@app-library/menu-main/types';

@Injectable()
export class HomeMenuService implements IMenuModuleService {
  loginMenuId = 'log-in-out';

  constructor(@Inject(USER_SERVICE) private user: IUserService) {

  }

  init(menuMain: IMenuMainService) {

  }


}
