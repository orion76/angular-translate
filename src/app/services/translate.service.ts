import { Injectable, Inject, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EMouseEvent, ISelectedLine, ILineEvent } from '../library/common';
import { TRANSLATED_PROCESS } from '@app/services/injection-tokens';
import { ITranslateProcess } from '@app/components/translate/process/translate-process';
import { TTranslateLineEntity } from '@app/types';

export interface ITranslateService {
  do(event: EMouseEvent, line: ISelectedLine): void
  onEvent(event: EMouseEvent): Observable<ILineEvent>;
  onOriginalLoad(originalId: string);
  onTranslatedLoaded(translatedId: string);
  onLineSelect(originalId: string);
  completeOriginalId(originalId: string);
}

@Injectable()
export class TranslateService implements ITranslateService {
  private _onEventSubject: BehaviorSubject<ILineEvent> = new BehaviorSubject(null);

  private onEvent$: Observable<ILineEvent> = this._onEventSubject.asObservable();


  lineId: string;

  constructor(@Inject(TRANSLATED_PROCESS) private process: ITranslateProcess) {

  }

  initMouseEvents(originalId: string, dom: HTMLElement, lines: Map<string, TTranslateLineEntity>
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
    return this.process.onOriginalLoaded(originalId);
  }

  onTranslatedLoaded(translatedId: string) {
    return this.process.onTranslatedLoaded(translatedId);
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
