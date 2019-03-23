import { IEntitySelector, IEntityStatusSelector, ISelectorWithProps, IStateSelector, IStatusSelector, IRequestSelector } from '@app-library/store/entity/selectors/types';
import { IStateProps, IStatusProps } from '@app-library/store/types';
import { IAppState } from '@app/app-store/app-store.module';
// import { IEntityOriginal as EntityType, IEntityOriginalStatus as EntityStatus } from '@app/types';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';


export namespace EntitySelectors {

  export function selectNotEmpty<T>(selector: ISelectorWithProps<any>, props?: IStateProps): OperatorFunction<IAppState, T> {

    return (source$: Observable<IAppState>) => {
      let mapped$: Observable<T>;
      mapped$ = source$.pipe(
        map(source => selector(source, <IStateProps>props)),
        distinctUntilChanged(),
        filter(Boolean)
      );
      return mapped$;
    };
  }

  export function selectState(selector: IStateSelector) {
    return (props: IStateProps) => {
      return (source$: Observable<IAppState>) => selectNotEmpty(selector, props)
    };
  }

  export function selectRequest<T>(selector: IRequestSelector) {
    return (props: IStateProps) => selectNotEmpty<T>(selector, props)
  }

  export function selectEntity<T>(selector: IEntitySelector) {
    return (props: IStateProps) => selectNotEmpty<T>(selector, props)

  }

  export function selectStatus<S>(selector: IStatusSelector) {
    return (props: IStateProps) => selectNotEmpty<S>(selector, props)
  }

  export function selectyEntityStatus<T>(selector: IEntityStatusSelector) {
    return (props: IStatusProps) => selectNotEmpty<T>(selector, props)

  }


}
