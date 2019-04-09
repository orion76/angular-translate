import { MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '@app/app-store/app-store.module';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

export function selectNotEmpty<T, P>(
  selector: MemoizedSelectorWithProps<IAppState, P, T>,
  props?: P): (source$: Observable<IAppState>) => Observable<T> {

  return (source$: Observable<IAppState>): Observable<T> => {
    let mapped$: Observable<T>;
    mapped$ = source$.pipe(
      map(source => selector(source, props as P)),
      distinctUntilChanged(),
      filter(Boolean)
    );
    return mapped$;
  };
}
