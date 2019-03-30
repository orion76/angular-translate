import { MenuItem } from 'primeng/components/common/menuitem';
import { IMenuState, TMenuPlace } from '@app-library/menu-main/store/types';


export namespace StoreActions {
  export enum Types {
    // INIT = '[MENU MAIN] INIT',
    ADD = '[MENU MAIN] ADD',
    UPDATE = '[MENU MAIN] UPDATE',
    DELETE = '[MENU MAIN] DELETE',
  }

  // export class INIT {
  //   readonly type = Types.INIT;
  //   constructor() { }
  // }

  export class ADD {
    readonly type = Types.ADD;
    constructor(public items: IMenuState[]) {
      console.log('ADD', items);
      if (!items) {
        console.error(items);
      }
    }
  }

  export class UPDATE {
    readonly type = Types.UPDATE;
    constructor(public items: IMenuState[]) {
      console.log('UPDATE', items);
     }
  }

  export class DELETE {
    readonly type = Types.DELETE;
    constructor(public items: IMenuState[]) {
      console.log('DELETE', items);
    }
  }



  export type Actions = ADD | UPDATE | DELETE;
}
