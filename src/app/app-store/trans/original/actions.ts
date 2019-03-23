import { EntityActions } from '@app-library/store/entity/actions';
import { IEntityRequestOriginal } from '@app-library/store/types';
import { IEntityOriginal } from '../../../types/trans';
import { StoreState } from './state';

export namespace StoreActions {
  import _featureName = StoreState.featureName;

  export class REQUEST extends EntityActions.REQUEST<IEntityRequestOriginal> {
    featureName = _featureName;
  }

  export class LOAD extends EntityActions.LOAD<IEntityRequestOriginal> {
    featureName = _featureName;
  }


  export class LOAD_SUCCESS extends EntityActions.LOAD_SUCCESS<IEntityOriginal>{
    featureName = _featureName;
  }

  export class LOAD_ERROR extends EntityActions.LOAD_ERROR {
    featureName = _featureName;
  }

  export type Actions = REQUEST | LOAD | LOAD_SUCCESS | LOAD_ERROR;
}
