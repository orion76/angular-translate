
import { ILoad, ILoadError, ILoadSuccess, IRequest } from '@app-library/store/entity/actions';
import { IRequestTranslated } from '@app-library/store/types';
import { IEntityTranslated } from '../../../types/trans';

export namespace StoreActions {

  export enum Types {
    REQUEST = '[TRANSLATED] REQUEST',
    LOAD = '[TRANSLATED] LOAD',
    LOAD_SUCCESS = '[TRANSLATED] LOAD_SUCCESS',
    LOAD_ERROR = '[TRANSLATED] LOAD_ERROR',
  }

  export class REQUEST implements IRequest<IRequestTranslated> {
    readonly type: Types.REQUEST
    constructor(public stateId: string, public request: IRequestTranslated) { }
  }

  export class LOAD implements ILoad<IRequestTranslated> {
    readonly type: Types.LOAD
    constructor(public stateId: string, public request: IRequestTranslated) { }
  }


  export class LOAD_SUCCESS implements ILoadSuccess<IEntityTranslated> {
    readonly type: Types.LOAD_SUCCESS
    constructor(public stateId: string, public entity: IEntityTranslated) { }
  }

  export class LOAD_ERROR implements ILoadError {
    readonly type: Types.LOAD_ERROR
    constructor(public stateId: string, public request: IRequestTranslated) { }
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
