import { EntityActions } from '@app-library/store/entity/actions';
import { IEntityRequest, IEntityState } from '@app-library/store/types';
import { IEntity } from '@app-types/common';
import { EntityAdapter, EntityState } from '@ngrx/entity';


export namespace EntityReducer {
  // import Actions = EntityActions.Actions;

  export function addRequest(
    featureAdapter: EntityAdapter<IEntityState>,
    action: EntityActions.REQUEST<IEntityRequest>,
    state: EntityState<IEntityState>) {

    const { stateId, request } = action;
    const status = { REQUEST: true };
    return featureAdapter.addOne({ stateId, request, status }, state);
  }

  export function load(
    featureAdapter: EntityAdapter<IEntityState>,
    action: EntityActions.LOAD<IEntityRequest>,
    state: EntityState<IEntityState>) {

    const { stateId } = action;
    const entityState = state.entities[stateId];
    const status = { ...entityState.status, LOAD: true };

    return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
  }

  export function loadSuccess(featureAdapter: EntityAdapter<IEntityState>, action: EntityActions.LOAD_SUCCESS<IEntity>, state: EntityState<IEntityState>) {
    const { stateId, entity } = action;
    const entityState = state.entities[stateId];
    const status = { ...entityState.status, LOAD_SUCCESS: true };

    return featureAdapter.updateOne({ id: stateId, changes: { status, entity } }, state);
  }

  export function loadError(featureAdapter: EntityAdapter<IEntityState>, action: EntityActions.LOAD_ERROR, state: EntityState<IEntityState>) {
    const { stateId } = action;
    const entityState = state.entities[stateId];
    const status = { ...entityState.status, LOAD_ERROR: true };

    return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
  }
}


