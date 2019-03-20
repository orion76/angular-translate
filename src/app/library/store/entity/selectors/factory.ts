import { MemoizedSelectorWithProps, createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { IEntityProps, IEntityStatusProps } from '@app/types';

import { IEntitySelectors, TEntityStates } from '@app-lib/store/entity/selectors/types';
import { IAppState } from '@app/app-store/app-store.module';
import { IEntityState } from '@app-lib/store/entity';
import { selectyEntity } from '@app-lib/store/entity/selectors/selectors';

export function getEntityStatus<EntityType, StatusType>(
  statuses: Dictionary<StatusType>,
  entities: Dictionary<EntityType>,
  props: IEntityStatusProps) {
  const { entityId, name, value } = props;

  if (!statuses[entityId]) {
    return;
  }
  const status: StatusType = statuses[entityId];
  if (status[name] === value) {
    return entities[entityId]
  }
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


type TSlectFeatureState = MemoizedSelector<IAppState, TEntityStates>;
export function getSelectors<EntityType>(featureName: keyof IAppState,
  featureAdapter: EntityAdapter<EntityType>) {

  const {
    // selectAll,
    selectEntities,
    // selectIds,
    // selectTotal
  } = featureAdapter.getSelectors();

  const selectFeatureState: TSlectFeatureState = createFeatureSelector<IAppState, TEntityStates>(featureName);
}

export function createSelectors<EntityType, StatusType>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<EntityType>
): IEntitySelectors<IAppState, EntityType, StatusType> {


  type TState = IEntityState<EntityType, StatusType>;




  type TEntities = MemoizedSelector<IAppState, Dictionary<EntityType>>;
  const entities: TEntities = createSelector(selectFeatureState, selectEntities);

  type TEntity = MemoizedSelectorWithProps<IAppState, IEntityProps, EntityType>;
  const selectEntity: TEntity = createSelector(entities, getEntity);





  type TStasuses = MemoizedSelector<IAppState, Dictionary<StatusType>>;
  const stasuses: TStasuses = createSelector(selectFeatureState, getStasuses) as TStasuses;


  type TEntityStasus = MemoizedSelectorWithProps<IAppState, IEntityStatusProps, EntityType>;
  const entityStatus: TEntityStasus = createSelector(
    stasuses,
    entities,
    getEntityStatus
  );

  type TStasus = MemoizedSelectorWithProps<IAppState, IEntityProps, StatusType>;
  const stasus: TStasus = createSelector(stasuses, getStatus);

  return {
    entities,
    entity: selectyEntity<EntityType>(selectEntity),
    stasuses,
    stasus,
    entityStatus
  }
}

