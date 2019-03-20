import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { IEntityProps, IEntityStatusProps, IEntityOriginal, IEntityTranslatedStatus, IEntityOriginalStatus, IEntityTranslated } from '@app/types';
import { IEntityState } from '@app-lib/store/entity';


export type TEntityStates = IEntityState<IEntityOriginal, IEntityOriginalStatus>
  | IEntityState<IEntityTranslated, IEntityTranslatedStatus>;

export interface IEntitySelectors<AppState, EntityType, StatusType> {
  entities: MemoizedSelector<AppState, Dictionary<EntityType>>,
  entity: (props: IEntityProps) => any,
  stasuses: MemoizedSelector<AppState, Dictionary<StatusType>>,
  stasus: MemoizedSelectorWithProps<AppState, IEntityProps, StatusType>,
  entityStatus: MemoizedSelectorWithProps<AppState, IEntityStatusProps, EntityType>,
}
