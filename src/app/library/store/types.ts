
import { IEntitySelectors } from '@app-library/store/entity/selectors/types';
import { EEntityType, ELanguage, IEntityOriginal, IEntityTranslated, IOriginalStatus, ITranslatedStatus, IEntityTranslate } from '@app/types';
import { IUserStatus, IUser } from '@app-library/user';
import { IEntity } from '@app-library/ng-http-service/entity/types';


export interface IEntityStatus {
  REQUEST?: boolean,
  LOAD?: boolean,
  LOAD_SUCCESS?: boolean,
  LOAD_ERROR?: boolean,
}

export type TStatusName = keyof IEntityStatus;
export type TSelectorNames = keyof IEntitySelectors<any, any, any>;
export type TSelectors = IEntitySelectors<any, any, any>[TSelectorNames];





export interface IStateProps {
  stateId: string
}
export interface IEntityState {
  stateId: string,
  request?: any,
  entity?: IEntity,
  status?: IEntityStatus
}


export interface ITranslateState<R, T extends IEntityTranslate, S extends IEntityStatus> extends IEntityState {
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





