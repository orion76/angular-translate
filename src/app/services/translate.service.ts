import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EMouseEvent, ILineEvent, ISelectedLine } from '@app-library/common';
import { IEntityRequest, TEntityRequest } from '@app-library/store/types';
import { IDataService } from '@app-services/data.service';
import { DATA_SERVICE } from '@app-services/injection-tokens';
import { EEntityType, IEntityTranslateLine, TTranslateEntity } from '@app/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ITranslateProcess, TRANSLATED_PROCESS } from '@pages/translate/process/translate-process';
import { IUserService, USER_SERVICE } from '@app-library/user';

export interface ITranslateService {
  do(event: EMouseEvent, line: ISelectedLine): void
  onEvent(event: EMouseEvent): Observable<ILineEvent>;
  onLineSelect(originalId: string);
  load(request: IEntityRequest);
  onLoad(type: EEntityType, stateId: string): Observable<TTranslateEntity>
  setOriginalId(originalId: string)
}

@Injectable()
export class TranslateService implements ITranslateService {
  private _onEventSubject: BehaviorSubject<ILineEvent> = new BehaviorSubject(null);

  private onEvent$: Observable<ILineEvent> = this._onEventSubject.asObservable();


  lineId: string;

  constructor(
    protected route: ActivatedRoute,
    @Inject(DATA_SERVICE) private data: IDataService,
    @Inject(USER_SERVICE) private user: IUserService,
    @Inject(TRANSLATED_PROCESS) private process: ITranslateProcess) {

  }

  initOriginalIds() {
    // return this.user.onLoaded()
    //   .pipe(
    //     combineLatest(this.onOriginalId(), (user: IUser, originalId: string) => {
    //       return { originalId, userId: user.entityId, language: user.language }
    //     }),
    //     tap((ids: IEntityIds) => {
    //       this.process.dispatch(new OriginalActions.ADD(ids))
    //     })
    //   )
  }

  setOriginalId(originalId: string) {
    this.process.Init(originalId);
  }


  load(request: TEntityRequest): Observable<TTranslateEntity> {
    return this.data.getItem(request);
  }

  onLoad(type: EEntityType, stateId: string): Observable<TTranslateEntity> {
    return this.process.onLoad(type, stateId);
  }

  initMouseEvents(originalId: string, dom: HTMLElement, lines: Map<string, IEntityTranslateLine>
  ) {
    Array.from(dom.getElementsByTagName('trans'))
      .forEach((trans: HTMLElement) => {
        const lineIdPrev = this.lineId;
        trans.innerHTML = lines.get(trans.id).content;

        trans.addEventListener('mouseenter', (event: MouseEvent) => this.do(
          EMouseEvent.MOUSE_ENTER, { originalId, lineIdPrev, lineId: (event.target as HTMLElement).id })
        );
        trans.addEventListener('mouseout', (event: MouseEvent) => this.do(
          EMouseEvent.MOUSE_OUT, { originalId, lineIdPrev, lineId: (event.target as HTMLElement).id })
        );
        trans.addEventListener('mousedown', (event: MouseEvent) => this.do(
          EMouseEvent.MOUSE_DOWN, { originalId, lineIdPrev, lineId: (event.target as HTMLElement).id })
        );
      })

    this.process.onLineSelect(originalId).subscribe((line: ISelectedLine) => {
      this.lineId = line.lineId;
    })

    this.onEvent(EMouseEvent.MOUSE_DOWN).subscribe((event: ILineEvent) => {
      this.process.selectLine(event.line.originalId, event.line.lineId);
    })
  }


  onLineSelect(originalId: string) {
    return this.process.onLineSelect(originalId);
  }



  init() {
    this.onEvent(EMouseEvent.MOUSE_DOWN)
      .subscribe((event: ILineEvent) => this.onMouseDownHandler(event.line))

    this.onEvent(EMouseEvent.MOUSE_ENTER)
      .subscribe((event: ILineEvent) => this.onMouseEnterHandler(event.line))

    this.onEvent(EMouseEvent.MOUSE_OUT)
      .subscribe((event: ILineEvent) => this.onMouseOutHandler(event.line))

  }
  onMouseDownHandler(line: ISelectedLine) {
    this.process.selectLine(line.originalId, line.lineId)
  }

  onMouseEnterHandler(line: ISelectedLine) {

  }

  onMouseOutHandler(line: ISelectedLine) {

  }

  onMouseEvent(line: ISelectedLine) {

  }

  onOriginalLoad(originalId: string) {
    // return this.process.onOriginalLoaded(originalId);
  }

  onTranslatedLoaded(translatedId: string) {
    // return this.process.onTranslatedLoaded(translatedId);
  }

  completeOriginalId(originalId: string) {
    this.process.completeOriginalId(originalId);
  }

  public onEvent(event: EMouseEvent) {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((item: ILineEvent) => item.event === event),
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }



  public do(event: EMouseEvent, line: ISelectedLine): void {
    this._onEventSubject.next({ event, line })
  }

}
