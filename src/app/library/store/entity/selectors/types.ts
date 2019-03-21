import { IEntityState } from '@app-lib/store/entity/selectors/original/types';
import { IEntityOriginal, IEntityProps, IEntityStatusProps, IEntityTranslated, IEntityTranslatedStatus } from '@app/types';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';




export interface IEntityStateTranslated extends IEntityState<IEntityTranslated, IEntityTranslatedStatus> { };





export interface IEntityAdapterOriginal extends EntityAdapter<IEntityOriginal> { };
export interface TEntityAdapterTranslated extends EntityAdapter<IEntityTranslated> { };
export type TEntityAdapter = IEntityAdapterOriginal | TEntityAdapterTranslated;


export interface IEntitySelectors<AppState, T, S> {
  entities: MemoizedSelector<AppState, Dictionary<T>>,
  entity: (props: IEntityProps) => any,
  stasuses: MemoizedSelector<AppState, Dictionary<S>>,
  stasus: MemoizedSelectorWithProps<AppState, IEntityProps, S>,
  entityStatus: MemoizedSelectorWithProps<AppState, IEntityStatusProps, T>,
}
