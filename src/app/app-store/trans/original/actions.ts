
import { ILoad, ILoadError, ILoadSuccess, IRequest } from '@app-library/store/entity/actions';
import { IRequestOriginal } from '@app-library/store/types';
import { IEntityOriginal } from '../../../types/trans';

export namespace StoreActions {

  export enum Types {
    REQUEST = '[ORIGINAL] REQUEST',
    LOAD = '[ORIGINAL] LOAD',
    LOAD_SUCCESS = '[ORIGINAL] LOAD_SUCCESS',
    LOAD_ERROR = '[ORIGINAL] LOAD_ERROR',
  }

  export class REQUEST implements IRequest<IRequestOriginal> {
    readonly type: Types.REQUEST
    constructor(public stateId: string, public request: IRequestOriginal) { }
  }

  export class LOAD implements ILoad<IRequestOriginal> {
    readonly type: Types.LOAD
    constructor(public stateId: string, public request: IRequestOriginal) { }
  }


  export class LOAD_SUCCESS implements ILoadSuccess<IEntityOriginal> {
    readonly type: Types.LOAD_SUCCESS
    constructor(public stateId: string, public entity: IEntityOriginal) { }
  }

  export class LOAD_ERROR implements ILoadError {
    readonly type: Types.LOAD_ERROR
    constructor(public stateId: string, public request: IRequestOriginal) { }
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
