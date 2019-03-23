import { ELanguage, IEntity, ITranslateEntity, IEntityOriginal, IOriginalStatus, IEntityTranslated, ITranslatedStatus, EEntityType, IUser, IUserStatus } from '@app/types';
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
export interface IStateUser extends ITranslateState<IRequestUser, IUser, IUserStatus> {
}

export interface IStateOriginal extends ITranslateState<IRequestOriginal, IEntityOriginal, IOriginalStatus> {
}

export interface IStateTranslated extends ITranslateState<IRequestTranslated, IEntityTranslated, ITranslatedStatus> {
}

export interface IEntityRequest {
  type: EEntityType;
}

export interface IRequestUser extends IEntityRequest {
  type: EEntityType.user;
  entityId: string;
}

export interface IRequestOriginal extends IEntityRequest {
  type: EEntityType.original;
  entityId: string;
}
export interface IRequestTranslated {
  type: EEntityType.translated;
  originalId: string;
  userId: string;
  language: ELanguage;
}

export type TEntityRequest = IRequestOriginal | IRequestTranslated;



export interface IStatusProps extends IStateProps {
  status: TStatusName;
  value: any
}





