
import { ILoad, ILoadError, ILoadSuccess, IRequest } from '@app-library/store/entity/actions';
import { IEntityState } from '@app-library/store/types';
import { EntityAdapter, EntityState } from '@ngrx/entity';


export namespace EntityReducer {
  // import Actions = EntityActions.Actions;

  export function addRequest(
    featureAdapter: EntityAdapter<IEntityState>,
    action: IRequest<any>,
    state: EntityState<any>) {

    const { stateId, request } = action;
    const status = { REQUEST: true };
    return featureAdapter.addOne({ stateId, request, status }, state);
  }

  export function load(
    featureAdapter: EntityAdapter<IEntityState>,
    action: ILoad<any>,
    state: EntityState<any>) {

    const { stateId } = action;
    const entityState = state.entities[stateId];
    const status = { ...entityState.status, LOAD: true };

    return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
  }

  export function loadSuccess(
    featureAdapter: EntityAdapter<IEntityState>,
    action: ILoadSuccess<any>,
    state: EntityState<any>) {

    const { stateId, entity } = action;
    const entityState = state.entities[stateId];
    const status = { ...entityState.status, LOAD_SUCCESS: true };

    return featureAdapter.updateOne({ id: stateId, changes: { status, entity } }, state);
  }

  export function loadError(
    featureAdapter: EntityAdapter<IEntityState>,
    action: ILoadError,
    state: EntityState<any>) {

    const { stateId } = action;
    const entityState = state.entities[stateId];
    const status = { ...entityState.status, LOAD_ERROR: true };

    return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
  }
}


