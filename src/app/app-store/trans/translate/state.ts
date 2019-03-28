


import { IEntityTranslate } from '@app/types';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IStateEntity } from '@xangular-store/entity/types';





export namespace StoreState {

  export interface IStateTranslate extends IStateEntity {
    entity?: IEntityTranslate;
  }

  export interface State extends EntityState<IStateTranslate> {
  }


  export const featureName = 'ENTITY_TRANSLATE';
  export const featureAdapter: EntityAdapter<IStateTranslate> = createEntityAdapter<IStateTranslate>({
    selectId: model => model.stateId,
  });
  export const initialState: State = featureAdapter.getInitialState({});
}
