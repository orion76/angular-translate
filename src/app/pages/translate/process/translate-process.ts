import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ISelectedLine } from '@app-library/common';
import { selectNotEmpty } from '@app-library/rxjs-helper';
import { IEntityRequest, IRequestTranslated, IStatusProps, TStatusName } from '@app-library/store/types';
import { IUser, IUserService } from '@app-library/user/types';
import { USER_SERVICE } from '@app-library/user/user.service';
import { StoreActions as OriginalActions, StoreSelectors as OriginalSelectors } from '@app-store/trans/original';
import { StoreSelectors as TranslatedSelectors } from '@app-store/trans/translated';
import { IAppState } from '@app/app-store/app-store.module';
import { } from '@app/app-store/trans/original';
import { StoreActions as SyncStateActions, StoreSelectors as SyncStateSelectors } from '@app/app-store/trans/sync-state';
import { StoreActions as TranslatedActions } from '@app/app-store/trans/translated';
import { EEntityType, IEntityTranslate, ISyncState } from '@app/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineLatest, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export const TRANSLATED_PROCESS = new InjectionToken<ITranslateProcess>('TRANSLATED_PROCESS');

export interface ITranslateProcess {

  Init(originalId: string);
  // enterLine(originalId: string, lineId: string);
  // outLine(originalId: string, lineId: string);
  selectLine(originalId: string, lineId: string);
  onLineSelect(originalId: string): Observable<ISelectedLine>;
  // onOriginalLoaded(entityId: string): Observable<IEntityOriginal>;
  // onTranslatedLoaded(entityId: string): Observable<IEntityTranslated>;

  completeOriginalId(originalId: string);
  // onEntityStatus(type: EEntityType, entityId: string, status: string, value: any): Observable<ITranslateEntity>;

  // load(type: EEntityType, stateId: string)
  onLoad(type: EEntityType, stateId: string): Observable<IEntityTranslate>;
}


@Injectable()
export class TranslateProcess implements ITranslateProcess {


  constructor(
    @Inject(USER_SERVICE) private user: IUserService,
    private store: Store<IAppState>
  ) {

  }


  onRequest(type: EEntityType, stateId: string): Observable<IEntityRequest> {
    const props: IStatusProps = { stateId, status: "REQUEST", value: true };

    switch (type) {
      case EEntityType.original:
        return this.store.pipe(OriginalSelectors.request(props))

      case EEntityType.translated:
        return this.store.pipe(TranslatedSelectors.request(props))
    }
  }


  onOriginal(entityId: string, status: TStatusName, value: any = true) {
    const props: IStatusProps = { stateId: entityId, status, value };
    return this.store.pipe(OriginalSelectors.entityStatus(props))
  }

  onTranslated(entityId: string, status: TStatusName, value: any = true) {
    const props: IStatusProps = { stateId: entityId, status, value };
    return this.store.pipe(TranslatedSelectors.entityStatus(props))
  }


  onLoad(type: EEntityType, stateId: string): Observable<IEntityTranslate> {
    switch (type) {
      case EEntityType.original:
        return this.onOriginal(stateId, "LOAD_SUCCESS");
      case EEntityType.translated:
        return this.onTranslated(stateId, "LOAD_SUCCESS");
    }
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


  Init(originalId: string) {

    this.store.dispatch(new OriginalActions.REQUEST(
      originalId,
      { type: EEntityType.original, entityId: originalId })
    );


    this.onRequest(EEntityType.original, originalId).pipe(
      // map(()=>)
      switchMap((request: IEntityRequestl) => {
        this.store.dispatch(new OriginalActions.LOAD(originalId, request));
        return this.onOriginal(originalId, "LOAD_SUCCESS");
      }),
      combineLatest(
        this.user.onLoaded(),
        (original: IEntityTranslate, user: IUser) => ({
          originalId: original.entityId,
          userId: user.entityId,
          language: user.language
        })
      ),
      switchMap((request: IRequestTranslated) => {
        this.store.dispatch(new TranslatedActions.LOAD(originalId, request));
        return this.onTranslated(originalId, "LOAD_SUCCESS");
      })
    )





    // this.on(Step.USER_LOADED).subscribe((user: IUser) => {

    // })

    // this.on(Step.USER_LOADED).subscribe((user: IUser) => {

    // })
  }

  // load(type: EEntityType, stateId: string) {

  //   switch (type) {
  //     case EEntityType.original:
  //       this.store.dispatch(new OriginalActions.LOAD(stateId));
  //       break;
  //     case EEntityType.translated:
  //       this.store.dispatch(new TranslatedActions.LOAD(stateId));
  //       break;
  //   }
  // }


}
