import { IAppState } from '@app/app-store/app-store.module';
import { IEntityProps } from '@app/types';
import { MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';



  export function selectNotEmpty<T, P>(pathOrMapFn: MemoizedSelectorWithProps<IAppState, P, T>, propsOrPath: P): (source$: Observable<IAppState>) => Observable<T> {

    return (source$: Observable<IAppState>): Observable<T> => {
      let mapped$: Observable<T>;
      mapped$ = source$.pipe(
        map(source => pathOrMapFn(source, <P>propsOrPath)),
        distinctUntilChanged(),
        filter(Boolean)
      );
      return mapped$;
    };
  }


  export function selectyEntity<T>(selector: any) {
    return (props: IEntityProps) => {
      return (source$: Observable<IAppState>) => selectNotEmpty<T, IEntityProps>(selector, props)
    };
  }


