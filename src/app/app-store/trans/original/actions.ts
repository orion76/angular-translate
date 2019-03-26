
import { ILoad, ILoadError, ILoadSuccess, IRequest } from '@app-library/store/entity/actions';
import { IEntityRequest } from '@app-library/store/types';
import { IEntityTranslate } from '../../../types/trans';

export namespace StoreActions {

  export enum Types {
    REQUEST = '[ORIGINAL] REQUEST',
    LOAD = '[ORIGINAL] LOAD',
    LOAD_SUCCESS = '[ORIGINAL] LOAD_SUCCESS',
    LOAD_ERROR = '[ORIGINAL] LOAD_ERROR',
  }

  export class REQUEST implements IRequest<IEntityRequest> {
    readonly type: Types.REQUEST
    constructor(public stateId: string, public request: IEntityRequest) { }
  }

  export class LOAD implements ILoad<IEntityRequest> {
    readonly type: Types.LOAD
    constructor(public stateId: string, public request: IEntityRequest) { }
  }


  export class LOAD_SUCCESS implements ILoadSuccess<IEntityTranslate> {
    readonly type: Types.LOAD_SUCCESS
    constructor(public stateId: string, public entity: IEntityTranslate) { }
  }

  export class LOAD_ERROR implements ILoadError {
    readonly type: Types.LOAD_ERROR
    constructor(public stateId: string, public request: IEntityRequest) { }
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
