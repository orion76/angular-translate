import { ELanguage, IEntity, ITranslateEntity, IEntityOriginal, IEntityOriginalStatus, IEntityTranslated, IEntityTranslatedStatus, EEntityType } from '@app/types';
import { Dictionary, EntityState } from '@ngrx/entity/src/models';
import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { EntityActions } from '@app-library/store/entity/actions';
import { IEntitySelectors } from '@app-library/store/entity/selectors/types';




export type TStatusName = keyof typeof EntityActions.Types;
export type TSelectorNames = keyof IEntitySelectors<any, any, any>;
export type TSelectors = IEntitySelectors<any, any, any>[TSelectorNames];

export type IEntityStatus = {
  [key in TStatusName]?: boolean
}


export interface IStateProps {
  stateId: string
}
export interface IEntityState {
  stateId: string,
  request?: any,
  entity?: IEntity,
  status?: IEntityStatus
}


export interface ITranslateState<R, T extends ITranslateEntity, S extends IEntityStatus> extends IEntityState {
  request?: R,
  entity?: T
  status?: S
}


export interface IStateOriginal extends ITranslateState<IEntityRequestOriginal, IEntityOriginal, IEntityOriginalStatus> {
}

export interface IStateTranslated extends ITranslateState<IRequestTranslated, IEntityTranslated, IEntityTranslatedStatus> {
}

export interface IEntityRequest {
  type: EEntityType;
}

export interface IEntityRequestOriginal extends IEntityRequest {
  type: EEntityType.original;
  entityId: string;
}
export interface IRequestTranslated {
  type: EEntityType.translated;
  originalId: string;
  userId: string;
  language: ELanguage;
}

export type TEntityRequest = IEntityRequestOriginal | IRequestTranslated;

export interface IEntityIds {
  originalId: string;
  userId: string;
  language: ELanguage
}


export interface IStatusProps extends IStateProps {
  status: TStatusName;
  value: any
}




export interface IUserProps {
  uid: string;
}



export interface ISelectors<AppState, EntityType> {

  selectIds: (state: EntityState<EntityType>) => string[] | number[];
  selectEntities: (state: EntityState<EntityType>) => Dictionary<EntityType>;
  selectAll: (state: EntityState<EntityType>) => EntityType[];
  selectTotal: (state: EntityState<EntityType>) => number;

  getEntity: (entities: Dictionary<EntityType>, props: IEntityIds) => EntityType;
  selectFeatureState: MemoizedSelector<AppState, EntityState<EntityType>>;
  Entities: MemoizedSelector<AppState, Dictionary<EntityType>>;
  Entity: MemoizedSelectorWithProps<AppState, IEntityIds, EntityType>
}
