import { MenuItem } from 'primeng/components/common/menuitem';
import { IMenuState } from '@app-library/menu-main/store/types';


export namespace StoreActions {
  export enum Types {
    INIT = '[MENU MAIN] INIT',
    ADD = '[MENU MAIN] ADD',
    UPDATE = '[MENU MAIN] UPDATE',
    DELETE = '[MENU MAIN] DELETE',
  }

  export class INIT {
    readonly type = Types.INIT;
    constructor() { }
  }

  export class ADD {
    readonly type = Types.ADD;
    constructor(public state: IMenuState) { }
  }

  export class UPDATE {
    readonly type = Types.UPDATE;
    constructor(public menuId: string, public path: string[], public items: MenuItem[]) { }
  }

  export class DELETE {
    readonly type = Types.DELETE;
    constructor(public menuId: string) { }
  }



  export type Actions = INIT | ADD | UPDATE | DELETE;
}
