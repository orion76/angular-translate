import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ISelectedLine } from '@app-library/common';
import { selectNotEmpty } from '@app-library/rxjs-helper';
import { IUserService } from '@app-library/user/types';
import { USER_SERVICE } from '@app-library/user/user.service';
import { StoreActions as TranslateActions, StoreSelectors, StoreState as TranslateState, TStatusName } from '@app-store/trans/translate';
import { IAppState } from '@app/app-store/app-store.module';
import { StoreActions as SyncStateActions, StoreSelectors as SyncStateSelectors } from '@app/app-store/trans/sync-state';
import { EEntityType, ISyncState } from '@app/types';
import { Store } from '@ngrx/store';
import { IStatusProps } from '@xangular-store/entity/types';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import IStateTranslate = TranslateState.IStateTranslate


export const TRANSLATED_PROCESS = new InjectionToken<ITranslateProcess>('TRANSLATED_PROCESS');

export interface ITranslateProcess {

  InitTranslated(originalId: string);
  // enterLine(originalId: string, lineId: string);
  // outLine(originalId: string, lineId: string);
  selectLine(originalId: string, lineId: string);
  onLineSelect(originalId: string): Observable<ISelectedLine>;
  // onOriginalLoaded(entityId: string): Observable<IEntityOriginal>;
  // onTranslatedLoaded(entityId: string): Observable<IEntityTranslated>;

  completeOriginalId(originalId: string);
  // onEntityStatus(type: EEntityType, entityId: string, status: string, value: any): Observable<ITranslateEntity>;

  // load(type: EEntityType, stateId: string)
  onLoad(stateId: string): Observable<IStateTranslate>
}


@Injectable()
export class TranslateProcess implements ITranslateProcess {

  protected translate = StoreSelectors.selectors;

  constructor(
    @Inject(USER_SERVICE) private user: IUserService,
    private store: Store<IAppState>
  ) {

  }


  onStatus(status: TStatusName, entityId: string): Observable<IStateTranslate> {
    const props: IStatusProps = { stateId: entityId, status, value: true };
    return this.store.pipe(this.translate.onStatus(props))
  }




  onLoad(stateId: string): Observable<IStateTranslate> {
    return this.onStatus("LOAD_SUCCESS", stateId);
  }

  completeOriginalId(originalId: string) {
    // this.store.dispatch(new OriginalActions.ADD(originalId));
  }

  selectLine(originalId: string, lineId: string) {
    this.store.dispatch(new SyncStateActions.selectLine(originalId, lineId));
  }

  onLineSelect(originalId: string): Observable<ISelectedLine> {
    return this.store
      .pipe(
        selectNotEmpty(SyncStateSelectors.Entity, { stateId: originalId }),
        distinctUntilChanged(),
        map((state: ISyncState) => {
          const { originalId, lineId, lineIdPrev } = state;
          return { originalId, lineId, lineIdPrev }
        })
      )
  }


  InitTranslated(entityId: string) {

    const source = EEntityType.translate;

    this.store.dispatch(new TranslateActions.REQUEST(entityId, { source, entityId }));

    this.onStatus('REQUEST', entityId).pipe(
      tap((state: IStateTranslate) => this.store.dispatch(new TranslateActions.LOAD(entityId, state.request))),
      switchMap((state: IStateTranslate) => this.onStatus("LOAD_SUCCESS", entityId)),
      map((state: IStateTranslate) => state.entity.parentId),
      tap((parentId: string) => this.store.dispatch(new TranslateActions.REQUEST(parentId, { entityId: parentId, source: EEntityType.translate }))),
      switchMap((parentId: string) => this.onStatus("LOAD_SUCCESS", parentId)),
      tap((parent: IStateTranslate) => this.store.dispatch(new TranslateActions.SET_PARENT(entityId, parent.entity))),
    )
  }
}
