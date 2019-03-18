import { Injectable, Inject, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ELineEvent, ISelectedLine, ILineEvent } from '../library/common';
import { TRANSLATED_PROCESS } from '@app/services/injection-tokens';
import { ITranslateProcess } from '@app/components/translate/process/translate-process';
import { TTranslateLineEntity } from '@app/types';

export interface ITranslateService {
  do(event: ELineEvent, line: ISelectedLine): void
  onEvent(event: ELineEvent): Observable<ILineEvent>;
  onOriginalLoad(originalId: string);
  onTranslatedLoaded(translatedId: string);

  completeOriginalId(originalId: string);
}

@Injectable()
export class TranslateService implements ITranslateService {
  private _onEventSubject: BehaviorSubject<ILineEvent> = new BehaviorSubject(null);

  private onEvent$: Observable<ILineEvent> = this._onEventSubject.asObservable();


  selectedLineId: string;

  constructor(@Inject(TRANSLATED_PROCESS) private process: ITranslateProcess,
    protected renderer: Renderer2) {

  }

  initMouseEvents(originalId: string, container: HTMLElement, dom: HTMLElement, lines: Map<string, TTranslateLineEntity>) {
    Array.from(dom.getElementsByTagName('trans'))
      .forEach((trans: HTMLElement) => {

        trans.innerHTML = lines.get(trans.id).content;

        trans.addEventListener('mouseenter', (event: MouseEvent) => this.do(
          ELineEvent.MOUSE_ENTER, { originalId, lineId: (event.target as HTMLElement).id })
        );
        trans.addEventListener('mouseout', (event: MouseEvent) => this.do(
          ELineEvent.MOUSE_OUT, { originalId, lineId: (event.target as HTMLElement).id })
        );
        trans.addEventListener('mousedown', (event: MouseEvent) => this.do(
          ELineEvent.MOUSE_DOWN, { originalId, lineId: (event.target as HTMLElement).id })
        );
      })

    this.onEvent(ELineEvent.MOUSE_ENTER).subscribe((event: ILineEvent) => {
      const target: HTMLElement = this.getElement(container, event.line.lineId);
      this.renderer.addClass(target, 'trans-mouse-enter');
    })


    this.onEvent(ELineEvent.MOUSE_OUT).subscribe((event: ILineEvent) => {
      const target: HTMLElement = this.getElement(container, event.line.lineId);
      this.renderer.removeClass(target, 'trans-mouse-enter');
    })

    this.onEvent(ELineEvent.MOUSE_DOWN).subscribe((event: ILineEvent) => {
      this.process.selectLine(event.line.originalId, event.line.lineId);
    })
  }

  InitEvents(originalId: string, container: HTMLElement) {

    this.process.onLineSelect(originalId).subscribe((line: ISelectedLine) => {
      if (this.selectedLineId) {
        this.renderer.removeClass(this.getElement(container, this.selectedLineId), 'trans-selected');
      }
      this.selectedLineId = line.lineId;
      this.renderer.addClass(this.getElement(container, this.selectedLineId), 'trans-selected');
    })

  }



  getElement(container: HTMLElement, id: string): HTMLElement {
    return container.querySelector('#' + id);
  }

  init() {
    this.onEvent(ELineEvent.MOUSE_DOWN)
      .subscribe((event: ILineEvent) => this.onMouseDownHandler(event.line))

    this.onEvent(ELineEvent.MOUSE_ENTER)
      .subscribe((event: ILineEvent) => this.onMouseEnterHandler(event.line))

    this.onEvent(ELineEvent.MOUSE_OUT)
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

  public onEvent(event: ELineEvent) {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((item: ILineEvent) => item.event === event),
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }


  onMouseDown() {

  }



  public do(event: ELineEvent, line: ISelectedLine): void {
    this._onEventSubject.next({ event, line })
  }

}
