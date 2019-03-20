import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { MemoizedSelector, MemoizedSelectorWithProps, createFeatureSelector, createSelector } from '@ngrx/store';
import { IEntityProps } from '@app/types';
import { IEntityState } from '@app-lib/store/entity';

export namespace EntityStore {

  export interface IEntitySelectors<AppState, EntityType, StatusType> {
    entities: MemoizedSelector<AppState, Dictionary<EntityType>>,
    entity: MemoizedSelectorWithProps<AppState, IEntityProps, EntityType>,
    stasuses: MemoizedSelector<AppState, Dictionary<StatusType>>,
    stasus: MemoizedSelectorWithProps<AppState, IEntityProps, StatusType>,
  }


  export function getStasuses<EntityType, StatusType>(state: IEntityState<EntityType, StatusType>, props: IEntityProps): Dictionary<StatusType> {
    return state.statuses;
  };

  export function getStatus<StatusType>(stasuses: Dictionary<StatusType>, props: IEntityProps): StatusType {
    return stasuses[props.entityId];
  };

  export function getEntity<EntityType>(entities: Dictionary<EntityType>, props: IEntityProps): EntityType {
    if (props.entityId === undefined || !entities[props.entityId]) {
      // console.warn('getValue', values, props);
      return;
    }
    return entities[props.entityId];
  };

  export function createSelectors<AppState, EntityType, StatusType>(
    featureName: keyof AppState,
    featureAdapter: EntityAdapter<EntityType>
  ): IEntitySelectors<AppState, EntityType, StatusType> {

    const {
      selectAll,
      selectEntities,
      selectIds,
      selectTotal

    } = featureAdapter.getSelectors();

    type TState = IEntityState<EntityType, StatusType>;
    type TSlectFeatureState = MemoizedSelector<AppState, TState>;

    const selectFeatureState: TSlectFeatureState = createFeatureSelector<AppState, TState>(featureName);

    type TEntities = MemoizedSelector<AppState, Dictionary<EntityType>>;
    const entities: TEntities = createSelector(selectFeatureState, selectEntities);

    type TEntity = MemoizedSelectorWithProps<AppState, IEntityProps, EntityType>;
    const entity: TEntity = createSelector(entities, getEntity);


    type TStasuses = MemoizedSelector<AppState, Dictionary<StatusType>>;
    const stasuses: TStasuses = createSelector(selectFeatureState, getStasuses) as TStasuses;

    type TStasus = MemoizedSelectorWithProps<AppState, IEntityProps, StatusType>;
    const stasus: TStasus = createSelector(stasuses, getStatus);

    return { entities, entity, stasuses, stasus }
  }
}
