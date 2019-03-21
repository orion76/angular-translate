import { IEntityState } from '@app-lib/store/entity/selectors/original/types';
import { IEntityProps, IEntityStatusProps } from '@app/types';
import { Dictionary } from '@ngrx/entity';



export function getEntityStatus<T, S>(statuses: Dictionary<S>, entities: Dictionary<T>, props: IEntityStatusProps): T {

  const { entityId, name, value } = props;

  if (!statuses[entityId]) {
    return;
  }
  const status: S = statuses[entityId];
  if (status[name] === value) {
    return entities[entityId]
  }
}


export function getStasuses<EntityType, StatusType>(state: IEntityState<EntityType, StatusType>, props: IEntityProps): Dictionary<StatusType> {
  return state.statuses;
};

export function getStatus<S>(stasuses: Dictionary<S>, props: IEntityProps): S {
  return stasuses[props.entityId];
}

export function getEntity<T>(entities: Dictionary<T>, props: IEntityProps): T {
  if (props.entityId === undefined || !entities[props.entityId]) {
    // console.warn('getValue', values, props);
    return;
  }
  return entities[props.entityId];
};




// export function createSelectors<T, S>(featureName: keyof IAppState, featureAdapter: EntityAdapter<T>): IEntitySelectors<IAppState, T, S> {

//   const { entities, stasuses } = collectionsSelectors<T, S>(featureName, featureAdapter);

//   const getEntity = (collection:) =>

//   return {
//     entities,
//     stasuses,
//     entity: selectEntity<T>(),
//     stasus: selectStatus<T>(),
//     entityStatus: selectyEntityStatus<T>()
//   }
//   }

