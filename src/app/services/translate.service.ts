import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ETranslateEvents, ISelectedLine } from '../library/common';
import { TRANSLATED_PROCESS } from '@app/services/injection-tokens';
import { ITranslateProcess } from '@app/components/translate/process/translate-process';

export interface ITranslateService {
  do(event: ETranslateEvents, transId: string, data?: any): void
  onEvent(event: ETranslateEvents): Observable<ISelectedLine>;

}

@Injectable()
export class TranslateService implements ITranslateService {
  private _onEventSubject: BehaviorSubject<ISelectedLine> = new BehaviorSubject(null);

  private onEvent$: Observable<ISelectedLine> = this._onEventSubject.asObservable();

  constructor(@Inject(TRANSLATED_PROCESS) process: ITranslateProcess) {

  }


  init() {
    this.onEvent(ETranslateEvents.MOUSE_DOWN)
      .subscribe((selected: ISelectedLine) => this.onMouseDownHandler(selected.transId))

    this.onEvent(ETranslateEvents.MOUSE_ENTER)
      .subscribe((selected: ISelectedLine) => this.onMouseEnterHandler(selected.transId))

    this.onEvent(ETranslateEvents.MOUSE_OUT)
      .subscribe((selected: ISelectedLine) => this.onMouseOutHandler(selected.transId))

  }
  onMouseDownHandler(transId: string) {
    this.process.
 }

  onMouseEnterHandler(transId: string) {

  }

  onMouseOutHandler(transId: string) {

  }

  onMouseEvent(event: ETranslateEvents, transId: string) {

  }

  public onEvent(event: ETranslateEvents) {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((item: ISelectedLine) => item.event === event),
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }


  onMouseDown() {

  }



  public do(event: ETranslateEvents, transId: string, data?: any): void {
    this._onEventSubject.next({ transId, event, data })
  }

}
