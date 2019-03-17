import { Injectable } from '@angular/core';
import { selectNotEmpty } from '@app-lib/rxjs-helper';
import { IAppState } from '@app/app-store/app-store.module';
import { ETranslatedStatus } from '@app/app-store/trans/translated-status';
import { StoreActions as TranslatedActions, StoreSelectors as TranslatedSelectors } from '@app/app-store/trans/translated';
import { ELanguage, IUser, ITranslatedState } from '@app/types';
import { Action, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Steps } from './steps';
import { StoreSelectors as UserActions } from '@app/app-store/trans/user'

import Step = Steps.EStep;
import { ISelectedLine } from '@app-lib/common';

export interface ITranslateProcess {
  dispatch(action: Action);

  enterLine(sourceId: string, transId: string);
  outLine(sourceId: string, transId: string);
  selectLine(sourceId: string, transId: string);
  onLineSelect(): Observable<ISelectedLine>
}


@Injectable()
export class TranslateProcess implements ITranslateProcess {

  private stepSubject: BehaviorSubject<Steps.TSteps> = new BehaviorSubject<Steps.TSteps>(null);
  private step$: Observable<Steps.TSteps> = this.stepSubject.asObservable();

  constructor(
    private store: Store<IAppState>,
  ) {

  }

  selectLine(sourceId: string, transId: string) {

  }
  onLineSelect() {
    this.store.pipe()
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  Init() {

    this.on(Step.ORIGINAL_ID_COMPLETE).subscribe((step: Steps.originalIdComplete) => {

      const { userId, originalId, language } = step;

      this.store.dispatch(new TranslatedActions.translatedFind(userId, originalId, language));

      this.onTranslatedLoaded(userId, originalId, language).subscribe((state: ITranslatedState) => {
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

  onTranslatedLoaded(userId: string, originalId: string, language: ELanguage): Observable<ITranslatedState> {
    return this.store.pipe(
      selectNotEmpty(TranslatedSelectors.Entity, { userId, originalId, language }),
      filter((state: ITranslatedState) => state.status.contains(ETranslatedStatus.LOAD))
    );
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
