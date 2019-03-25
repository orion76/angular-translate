import { Dictionary } from '@ngrx/entity';
import { IStateProps, IEntityState, IEntityRequest, IEntityStatus, IStatusProps } from '@app-library/store/types';
import { IEntity } from '@app-library/ng-http-service/entity/types';


export function getState(): (collection: Dictionary<IEntityState>, props: IStateProps) => IEntityState {
  return (collection: Dictionary<IEntityState>, props: IStateProps) => collection[props.stateId];
}

export function getRequest(): (state: IEntityState) => IEntityRequest {
  return (state: IEntityState) => state.request;
}

export function getEntity(): (state: IEntityState) => IEntity {
  return (state: IEntityState) => state.entity;
}

export function getStatus(): (state: IEntityState) => IEntityStatus {
  return (state: IEntityState) => state.status;
}

export function getEntityStatus(state: IEntityState, props: IStatusProps): IEntity {
  const { status, value } = props;
  if (state.status[status] && state.status[status] === value) {
    return state.entity;
  }
}
