import { IUser } from '@app/types/user';
import { StoreState } from './state';
import { IActionType, createActionTypes, EntityActions } from '@app-library/store/entity/actions';
import { IRequestTranslated, IRequestUser } from '@app-library/store/types';

export namespace StoreActions {

  import _featureName = StoreState.featureName;

  export const Types: IActionType = createActionTypes(_featureName);

  export class REQUEST extends EntityActions.REQUEST<IRequestUser> {
    featureName = _featureName;
  }

  export class LOAD extends EntityActions.LOAD<IRequestUser> {
    featureName = _featureName;
  }


  export class LOAD_SUCCESS extends EntityActions.LOAD_SUCCESS<IUser>{
    featureName = _featureName;
  }

  export class LOAD_ERROR extends EntityActions.LOAD_ERROR {
    featureName = _featureName;
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
