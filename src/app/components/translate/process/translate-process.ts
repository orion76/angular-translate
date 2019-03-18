import { Injectable } from '@angular/core';
import { selectNotEmpty } from '@app-lib/rxjs-helper';
import { IAppState } from '@app/app-store/app-store.module';
import { ETranslatedStatus } from '@app/app-store/trans/translated-status';
import {
  StoreActions as OriginalActions,
  StoreSelectors as OriginalSelectors
} from '@app/app-store/trans/original';

import {
  StoreActions as OriginalStatusActions,
  StoreSelectors as OriginalStatusSelectors
} from '@app/app-store/trans/original-status';


import {
  StoreActions as TranslatedActions,
  StoreSelectors as TranslatedSelectors
} from '@app/app-store/trans/translated';

import {
  StoreActions as TranslatedStatusActions,
  StoreSelectors as TranslatedStatusSelectors
} from '@app/app-store/trans/translated-status';

import {
  StoreActions as SyncStateActions,
  StoreSelectors as SyncStateSelectors
} from '@app/app-store/trans/sync-state';


import { ELanguage, IUser, ITranslatedState, ITranslatedEntity, IOriginalEntity, ISyncState } from '@app/types';
import { Action, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, take, withLatestFrom, map, combineLatest, distinctUntilChanged } from 'rxjs/operators';
import { Steps } from './steps';
import { StoreSelectors as UserActions } from '@app/app-store/trans/user';


import Step = Steps.EStep;
import { ISelectedLine } from '@app-lib/common';

export interface ITranslateProcess {
  dispatch(action: Action);

  // enterLine(originalId: string, lineId: string);
  // outLine(originalId: string, lineId: string);
  selectLine(originalId: string, lineId: string);
  onLineSelect(originalId: string): Observable<ISelectedLine>;
  onOriginalLoaded(entityId: string): Observable<IOriginalEntity>;
  onTranslatedLoaded(entityId: string): Observable<ITranslatedEntity>;

  completeOriginalId(originalId: string);
}


@Injectable()
export class TranslateProcess implements ITranslateProcess {

  private stepSubject: BehaviorSubject<Steps.TSteps> = new BehaviorSubject<Steps.TSteps>(null);
  private step$: Observable<Steps.TSteps> = this.stepSubject.asObservable();

  constructor(
    private store: Store<IAppState>,
  ) {

  }
  onOriginalLoaded(entityId: string): Observable<IOriginalEntity> {
    return this.store.pipe(
      selectNotEmpty(OriginalStatusSelectors.Entity, { entityId }),
      withLatestFrom(this.store.pipe(selectNotEmpty(OriginalSelectors.Entity, { entityId }))),
      map(([_, entity]) => entity)
    )
  }

  onTranslatedLoaded(entityId: string): Observable<ITranslatedEntity> {
    return this.store.pipe(
      selectNotEmpty(TranslatedStatusSelectors.Entity, { entityId }),
      withLatestFrom(this.store.pipe(selectNotEmpty(TranslatedSelectors.Entity, { entityId }))),
      map(([_, entity]) => entity)
    )
  }
  completeOriginalId(originalId: string) {
    this.store.dispatch(new OriginalActions.originalId(originalId));
  }

  selectLine(originalId: string, lineId: string) {
    this.store.dispatch(new SyncStateActions.selectLine(originalId, lineId));
  }

  onLineSelect(originalId: string): Observable<ISelectedLine> {
    return this.store
      .pipe(
        selectNotEmpty(SyncStateSelectors.Entity, { entityId: originalId }),
        distinctUntilChanged(),
        map((state: ISyncState) => {
          const { originalId, lineId } = state;
          return { originalId, lineId }
        })
      )
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  Init() {

    this.on(Step.ORIGINAL_ID_COMPLETE).subscribe((step: Steps.originalIdComplete) => {

      const { userId, originalId, language } = step;

      this.store.dispatch(new TranslatedActions.translatedFind(userId, originalId, language));

      this.onTranslatedLoaded(originalId)
        .subscribe((state: ITranslatedState) => {
          this.nextStep(new Steps.translatedLoaded(state.entity));
        })
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

  _onUserLoaded(): Observable<IUser> {
    const user: IUser = { uid: '1', name: 'user-loaded', language: ELanguage.RU };
    return of(user).pipe(take(1));
  }

}
