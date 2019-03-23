import { Action } from '@ngrx/store';
import { IEntityRequest } from '@app-library/store/types';
import { IEntity } from '@app-types/common';


export interface IActionType {
  REQUEST: string,
  LOAD: string,
  LOAD_SUCCESS: string,
  LOAD_ERROR: string,
}


export function createActionTypes(featureName?: string): IActionType {

  const prefix = featureName ? `[${featureName} ]` : '';
  return {
    REQUEST: prefix + 'REQUEST',
    LOAD: prefix + 'LOAD',
    LOAD_SUCCESS: prefix + 'LOAD_SUCCESS',
    LOAD_ERROR: prefix + 'LOAD_ERROR',
  }
}
export namespace EntityActions {

  export const Types: IActionType = createActionTypes();

  export abstract class FeatureAction implements Action {
    abstract action: string;
    abstract featureName: string;
    get type() {
      return `[${this.featureName}] ${this.action}`
    }

  }

  export abstract class REQUEST<R extends IEntityRequest> extends FeatureAction {
    action = Types.REQUEST;
    constructor(public stateId: string, public request: R) {
      super();
    }
  }

  // export class request extends REQUEST<IEntityRequest>{
  //   featureName: 'dddd';
  // }

  export abstract class LOAD<R> extends FeatureAction {
    action = Types.LOAD;
    constructor(public stateId: string, public request: R) {
      super();
    }
  }

  export abstract class LOAD_SUCCESS<T extends IEntity> extends FeatureAction {
    action = Types.LOAD_SUCCESS;
    constructor(public stateId: string, public entity: T) {
      super();
    }
  }

  export abstract class LOAD_ERROR extends FeatureAction {
    action = Types.LOAD_ERROR;
    constructor(public stateId: string) {
      super();
    }
  }

  export type Actions = REQUEST<IEntityRequest>
    | LOAD<IEntityRequest>
    | LOAD_SUCCESS<IEntity>
    | LOAD_ERROR;

}
