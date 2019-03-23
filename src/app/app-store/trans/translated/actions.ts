
import { createActionTypes, EntityActions, IActionType } from '@app-library/store/entity/actions';
import { IRequestTranslated } from '@app-library/store/types';
import { IEntityTranslated } from '../../../types/trans';
import { StoreState } from './state';

export namespace StoreActions {

  import _featureName = StoreState.featureName;

  export const Types: IActionType = createActionTypes(_featureName);

  export class REQUEST extends EntityActions.REQUEST<IRequestTranslated> {
    featureName = _featureName;
  }

  export class LOAD extends EntityActions.LOAD<IRequestTranslated> {
    featureName = _featureName;
  }


  export class LOAD_SUCCESS extends EntityActions.LOAD_SUCCESS<IEntityTranslated>{
    featureName = _featureName;
  }

  export class LOAD_ERROR extends EntityActions.LOAD_ERROR {
    featureName = _featureName;
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
