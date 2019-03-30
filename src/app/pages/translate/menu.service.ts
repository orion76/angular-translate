import { IMenuService } from '@app-library/menu-main/types';
import { IMenuMainService } from '@app-library/menu-main/menu-main.service';

export class MenuService implements IMenuService {
  Init(main: IMenuMainService) {
    console.log('[MenuService]', main);
    main.add([
      {
        place: 'right', path: ['user'], id: 'translate',
        item: { label: 'Translates', routerLink: '/user/translates' }
      }
    ]);
  }
}
