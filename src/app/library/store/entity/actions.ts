import { Action } from '@ngrx/store';



export interface IAction extends Action {
  stateId: string;
}

export interface IRequest<R> extends IAction {
  request: R;
}

export interface ILoad<R> extends IAction {
  request: R;
}

export interface ILoadSuccess<E> extends IAction {
  entity: E;
}

export interface ILoadError extends IAction {
}


export type TActions = IRequest<any> | ILoad<any> | ILoadSuccess<any> | ILoadError
