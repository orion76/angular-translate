import { Action } from '@ngrx/store';
import { IEntityRequest } from '@app-library/store/types';
import { IEntity } from '@app-types/common';




export namespace EntityActions {

  export enum Types {
    REQUEST = 'REQUEST',
    LOAD = 'LOAD',
    LOAD_SUCCESS = 'LOAD_SUCCES',
    LOAD_ERROR = 'LOAD_ERROR',
  }

  export abstract class FeatureAction implements Action {
    abstract action: Types;
    abstract featureName: string;
    get type() {
      return `[${this.featureName}] ${this.action}`
    }

  }

  export abstract class REQUEST<R extends IEntityRequest> extends FeatureAction {
    action: Types.REQUEST;
    constructor(public stateId: string, public request: R) {
      super();
    }
  }

  // export class request extends REQUEST<IEntityRequest>{
  //   featureName: 'dddd';
  // }

  export abstract class LOAD<R> extends FeatureAction {
    action: Types.LOAD;
    constructor(public stateId: string, public request: R) {
      super();
    }
  }

  export abstract class LOAD_SUCCESS<T extends IEntity> extends FeatureAction {
    action: Types.LOAD_SUCCESS;
    constructor(public stateId: string, public entity: T) {
      super();
    }
  }

  export abstract class LOAD_ERROR extends FeatureAction {
    action: Types.LOAD_ERROR;
    constructor(public stateId: string) {
      super();
    }
  }

  export type Actions = REQUEST<IEntityRequest>
    | LOAD<IEntityRequest>
    | LOAD_SUCCESS<IEntity>
    | LOAD_ERROR;

}
