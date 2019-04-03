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
import { IStatusProps, TStatus } from '@xangular-store/entity/types';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';



import ITranslateStates = TranslateState.ITranslateStates;
import IStateTranslate = TranslateState.IStateTranslate;
import TTranslateStatusList = TranslateState.TTranslateStatusList;

export type TTranslateStatus = TStatus<TTranslateStatusList>;

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


  onStatus(status: TTranslateStatus, entityId: string): Observable<IStateTranslate> {
    const props: IStatusProps = { stateId: entityId, status };
    return this.store.pipe(this.translate.isStatus(props))
  }




  onLoad(stateId: string): Observable<IStateTranslate> {
    return this.onStatus({ LOAD_SUCCESS: true }, stateId);
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


  InitTranslated(id: string) {

    const source = EEntityType.translate;

    this.store.dispatch(new TranslateActions.Add(id, { source, id }));

    this.onStatus({ REQUEST: true }, id).pipe(
      tap((translated: IStateTranslate) => this.store.dispatch(new TranslateActions.LOAD(id, translated.data.request))),
      switchMap((translated: IStateTranslate) => this.onStatus({ LOAD_SUCCESS: true }, id)),
      map((translated: IStateTranslate) => translated.data.entity.parentId),
      tap((parentId: string) => this.store.dispatch(new TranslateActions.Add(parentId, { id: parentId, source: EEntityType.translate }))),
      switchMap((parentId: string) => this.onStatus({ REQUEST: true }, parentId)),
      tap((parent: IStateTranslate) => this.store.dispatch(new TranslateActions.SET_PARENT(id, parent.data.entity))),
    )
  }
}
