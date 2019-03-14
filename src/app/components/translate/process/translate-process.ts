import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@app-store/app-store.module';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IUser } from '@app-types/user';
import { ELanguage } from '@app-types/common';
import { take, filter, withLatestFrom } from 'rxjs/operators';
import { Steps } from './steps';

import { StoreActions as TranslatedActions } from '@app-store/trans/translated/actions';
import { StoreSelectors as TranslatedSelectors } from '@app-store/trans/translated/selectors';
import { StoreSelectors as TranslatedStatusSelectors } from '@app-store/trans/translated-status/selectors';

import Step = Steps.EStep;
import { IOriginalEntity, ITranslatedEntity } from '@app-types/trans';
import { selectNotEmpty } from '@app-lib/rxjs-helper';
import { ITranslatedState } from '@app-types/trans-state';
import { ETranslatedStatus } from '@app-store/trans/translated-status/actions';

export interface ITranslateProcess {
}


@Injectable()
export class TranslateProcess implements ITranslateProcess {

  private stepSubject: BehaviorSubject<Steps.TSteps> = new BehaviorSubject<Steps.TSteps>(null);
  private step$: Observable<Steps.TSteps> = this.stepSubject.asObservable();

  constructor(
    private store: Store<IAppState>,
  ) {

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
    const user: IUser = { userId: '1', name: 'user-loaded', language: ELanguage.RU };
    return of(user).pipe(take(1));
  }

}
