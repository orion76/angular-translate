import { Injectable } from '@angular/core';
import { ISelectedLine } from '@app-lib/common';
import { selectNotEmpty } from '@app-lib/rxjs-helper';
import { IAppState } from '@app/app-store/app-store.module';
import { EntitySelectors } from '@app/app-store/trans/entity-selectors';
import { StoreActions as OriginalActions } from '@app/app-store/trans/original';
import { StoreActions as SyncStateActions, StoreSelectors as SyncStateSelectors } from '@app/app-store/trans/sync-state';
import { StoreActions as TranslatedActions } from '@app/app-store/trans/translated';
import { EEntityType, ELanguage, IEntityOriginal, IEntityStatusProps, IEntityTranslated, ISyncState, ITranslateEntity, IUser } from '@app/types';
import { Action, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { Steps } from './steps';


import Step = Steps.EStep;

export interface ITranslateProcess {
  dispatch(action: Action);

  // enterLine(originalId: string, lineId: string);
  // outLine(originalId: string, lineId: string);
  selectLine(originalId: string, lineId: string);
  onLineSelect(originalId: string): Observable<ISelectedLine>;
  onOriginalLoaded(entityId: string): Observable<IEntityOriginal>;
  onTranslatedLoaded(entityId: string): Observable<IEntityTranslated>;

  completeOriginalId(originalId: string);
  onEntityStatus(type: EEntityType, entityId: string, status: string, value: any): Observable<ITranslateEntity>;
}


@Injectable()
export class TranslateProcess implements ITranslateProcess {

  private selectors = EntitySelectors;

  private stepSubject: BehaviorSubject<Steps.TSteps> = new BehaviorSubject<Steps.TSteps>(null);
  private step$: Observable<Steps.TSteps> = this.stepSubject.asObservable();

  constructor(
    private store: Store<IAppState>
  ) {

  }
  onOriginalLoaded(entityId: string): Observable<IEntityOriginal> {
    return null;
    // return this.store.pipe(
    //   selectNotEmpty(OriginalStatusSelectors.Entity, { entityId }),
    //   withLatestFrom(this.store.pipe(selectNotEmpty(OriginalSelectors.Entity, { entityId }))),
    //   map(([_, entity]) => entity)
    // )
  }

  onEntityStatus(type: EEntityType, entityId: string, name: string, value: any): Observable<IEntityOriginal | IEntityTranslated> {
    const selector = this.getSelector(type, 'entityStatus');
    const props: IEntityStatusProps = { entityId, name, value };
    return this.store.pipe(selectNotEmpty(selector, props));
  }

  onTranslatedLoaded(entityId: string): Observable<IEntityTranslated> {

    return null;
    // return this.store.pipe(
    //   selectNotEmpty(TranslatedStatusSelectors.Entity, { entityId }),
    //   withLatestFrom(this.store.pipe(selectNotEmpty(TranslatedSelectors.Entity, { entityId }))),
    //   map(([_, entity]) => entity)
    // )
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
          const { originalId, lineId, lineIdPrev } = state;
          return { originalId, lineId, lineIdPrev }
        })
      )
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getSelector(type: EEntityType, selector: string) {
    return this.selectors[type][selector];
  }

  Init() {

    this.on(Step.ORIGINAL_ID_COMPLETE).subscribe((step: Steps.originalIdComplete) => {

      const { userId, originalId, language } = step;

      this.store.dispatch(new TranslatedActions.translatedFind(userId, originalId, language));

      this.onTranslatedLoaded(originalId)
        .subscribe((entity: IEntityTranslated) => {
          this.nextStep(new Steps.translatedLoaded(entity));
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
    const user: IUser = { entityId: '1', name: 'user-loaded', language: ELanguage.RU };
    return of(user).pipe(take(1));
  }

}
