import { MemoizedSelectorWithProps } from '@ngrx/store';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { Observable, OperatorFunction } from 'rxjs';
import { IAppState } from '@app/app-store/app-store.module';
import { IEntityProps } from '@app-lib/store/types';
import { IEntityOriginal as IEntity } from '@app/types';


type TEntitySelector = MemoizedSelectorWithProps<IAppState, IEntityProps, IEntity>;

export function selectNotEmpty(
  pathOrMapFn: MemoizedSelectorWithProps<IAppState, IEntityProps, IEntity>,
  propsOrPath: IEntityProps
): OperatorFunction<IAppState, IEntity> {

  return (source$: Observable<IAppState>) => {
    let mapped$: Observable<IEntity>;
    mapped$ = source$.pipe(
      map(source => pathOrMapFn(source, <IEntityProps>propsOrPath)),
      distinctUntilChanged(),
      filter(Boolean)
    );
    return mapped$;
  };
}


export function selectyEntity(selector: TEntitySelector) {
  return (props: IEntityProps) => {
    return (source$: Observable<IAppState>) => selectNotEmpty(selector, props)
  };
}

