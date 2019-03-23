import { Inject, Injectable } from '@angular/core';
import { ISelectedLine } from '@app-library/common';
import { selectNotEmpty } from '@app-library/rxjs-helper';
import { IStatusProps, TStatusName, IEntityState, IStateOriginal, IEntityRequest, IEntityRequestOriginal, IRequestTranslated } from '@app-library/store/types';
import {
  StoreActions as OriginalActions,
  StoreSelectors as OriginalSelectors
} from '@app-store/trans/original';
import {
  StoreSelectors as TranslatedSelectors
} from '@app-store/trans/translated';
import { IAppState } from '@app/app-store/app-store.module';
import { } from '@app/app-store/trans/original';
import { StoreActions as SyncStateActions, StoreSelectors as SyncStateSelectors } from '@app/app-store/trans/sync-state';
import { StoreActions as TranslatedActions } from '@app/app-store/trans/translated';
import { USER_SERVICE } from '@app/services/injection-tokens';
import { EEntityType, IEntityOriginal, IEntityTranslated, ISyncState, IUserService, IUser } from '@app/types';
import { Action, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, combineLatest } from 'rxjs/operators';
import { Steps } from './steps';


import Step = Steps.EStep;

export interface ITranslateProcess {
  dispatch(action: Action);

  // enterLine(originalId: string, lineId: string);
  // outLine(originalId: string, lineId: string);
  selectLine(originalId: string, lineId: string);
  onLineSelect(originalId: string): Observable<ISelectedLine>;
  // onOriginalLoaded(entityId: string): Observable<IEntityOriginal>;
  // onTranslatedLoaded(entityId: string): Observable<IEntityTranslated>;

  completeOriginalId(originalId: string);
  // onEntityStatus(type: EEntityType, entityId: string, status: string, value: any): Observable<ITranslateEntity>;

  // load(type: EEntityType, stateId: string)
  // onLoad(type: EEntityType, stateId: string): Observable<TTranslateEntity>;
}


@Injectable()
export class TranslateProcess implements ITranslateProcess {



  private stepSubject: BehaviorSubject<Steps.TSteps> = new BehaviorSubject<Steps.TSteps>(null);
  private step$: Observable<Steps.TSteps> = this.stepSubject.asObservable();

  constructor(
    @Inject(USER_SERVICE) private user: IUserService,
    private store: Store<IAppState>
  ) {

  }


  onRequest(type: EEntityType, stateId: string): Observable<IEntityRequestOriginal | IRequestTranslated> {
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

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  Init(originalId: string) {



    this.onRequest(EEntityType.original, originalId).pipe(
      // map(()=>)
      switchMap((request: IEntityRequestOriginal) => {
        this.store.dispatch(new OriginalActions.LOAD(originalId, request));
        return this.onOriginal(originalId, "LOAD_SUCCESS");
      }),
      combineLatest(
        this.user.onLoaded(),
        (original: IEntityOriginal, user: IUser) => ({
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

    this.on(Step.ORIGINAL_ID_COMPLETE).subscribe((step: Steps.originalIdComplete) => {

      const { userId, originalId, language } = step;

      // this.store.dispatch(new TranslatedActions.Find(userId, originalId, language));


    })

    this.on(Step.TRANSLATE_LOADED).subscribe((step: Steps.translatedLoaded) => {
      const { entity } = step;
      this.nextStep(new Steps.translatedChanged(entity))
    })

    // this.on(Step.USER_LOADED).subscribe((user: IUser) => {

    // })

    // this.on(Step.USER_LOADED).subscribe((user: IUser) => {

    // })
  }


  on(stepType: Step): Observable<Steps.TSteps> {
    return this.step$.pipe(
      filter((step: Steps.TSteps) => step.type === stepType)
    );
  }

  nextStep(step: Steps.TSteps) {
    this.stepSubject.next(step);
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
