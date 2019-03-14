import { MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '@app-store/app-store.module';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

export function selectNotEmpty<T, P>(pathOrMapFn: MemoizedSelectorWithProps<IAppState, P, T>, propsOrPath: P): (source$: Observable<IAppState>) => Observable<T> {

  return function selectOperator(source$: Observable<IAppState>): Observable<T> {
    let mapped$: Observable<T>;
    mapped$ = source$.pipe(
      map(source => pathOrMapFn(source, <P>propsOrPath)),
      distinctUntilChanged(),
      filter(Boolean)
    );
    return mapped$;
  };
}
