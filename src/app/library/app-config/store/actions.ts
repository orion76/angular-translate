import {IMenuState} from '@app-library/menu-main/store/types';
import {ISourceConfig} from '@app-library/app-config';


export namespace StoreActions {
  export enum Types {
    ADD = '[APP CONFIG] ADD',
  }

  export class Add {
    readonly type = Types.ADD;

    constructor(public stateId: string, public config: ISourceConfig<any>) {

    }
  }


  export type Actions = Add;
}
