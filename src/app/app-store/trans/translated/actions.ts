
import { IEntityTranslated, IEntityOriginal } from '../../../types/trans';
import { IRequestTranslated, IEntityRequestOriginal } from '@app-library/store/types';
import { Action } from '@ngrx/store';
import { EntityActions } from '@app-library/store/entity/actions';
import { StoreState } from './state';

export namespace StoreActions {

  import _featureName = StoreState.featureName;

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
