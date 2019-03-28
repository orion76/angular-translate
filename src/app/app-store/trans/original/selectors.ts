
// import IFormProps = FormSelectors.IFormProps;

import { IAppState } from '@app-store/app-store.module';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { EntitySelectors } from '@xangular-store/entity';
import { IEntityStatus, IFieldEqualProps, IFieldProps, IStateProps } from '@xangular-store/entity/types';
import { OperatorFunction } from 'rxjs';
import { StoreState } from './state';



export namespace StoreSelectors {

  import State = StoreState.State;
  import featureName = StoreState.featureName;
  import IEntityState = StoreState.IEntityState;





  export const feature: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  export const entities: MemoizedSelector<IAppState, Dictionary<IEntityState>> = EntitySelectors.collectionsSelector<IAppState, State, IEntityState>(feature, 'entities');
  export const entitySelector: MemoizedSelectorWithProps<IAppState, IStateProps, IEntityState> = EntitySelectors.entitySelector<IAppState, IEntityState>(entities);
  export const entity: (props: IStateProps) => OperatorFunction<IAppState, IEntityState> = EntitySelectors.entity<IAppState, IEntityState>(entitySelector);


  export const stasuses: MemoizedSelector<IAppState, Dictionary<IEntityStatus>> = EntitySelectors.collectionsSelector<IAppState, State, IEntityStatus>(feature, 'statuses');
  export const entityStatusSelector: MemoizedSelectorWithProps<IAppState, IStateProps, IEntityStatus> = EntitySelectors.entitySelector<IAppState, IEntityStatus>(stasuses);
  export const statusSelector: MemoizedSelectorWithProps<IAppState, IFieldProps, any> = EntitySelectors.fieldSelector<IAppState, IEntityStatus, any>(entityStatusSelector);

  type TStatusEqualSelector = MemoizedSelectorWithProps<IAppState, IFieldEqualProps<boolean>, any>;
  export const statusEqualSelector: TStatusEqualSelector = EntitySelectors.fieldEqualSelector<IAppState, boolean>(statusSelector);

  export const entityStatus: (props: IStateProps) => OperatorFunction<IAppState, IEntityStatus> = EntitySelectors.entity<IAppState, IEntityStatus>(statusSelector);

  export const status: (props: IFieldEqualProps<boolean>) => OperatorFunction<IAppState, boolean> = EntitySelectors.status<IAppState>(statusEqualSelector);

}
