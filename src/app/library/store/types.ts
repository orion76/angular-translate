
import { IEntitySelectors } from '@app-library/store/entity/selectors/types';
import { EEntityType, ELanguage, IEntityTranslate } from '@app/types';
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


export interface ITranslateState<R, T extends IEntity, S extends IEntityStatus> extends IEntityState {
  request?: R,
  entity?: T
  status?: S
}



export interface IStateTranslated extends ITranslateState<IRequestTranslated, IEntityTranslate, IEntityStatus> {
}

export interface IEntityRequest {
  type: EEntityType;
    entityId: string;
}

export interface IRequestTranslated {
  type: EEntityType.translated;
  originalId: string;
  userId: string;
  language: ELanguage;
}


export interface IStatusProps extends IStateProps {
  status: TStatusName;
  value: any
}





