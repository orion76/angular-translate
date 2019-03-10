import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TTranslateMode, ISelectedTranslateString, EEvents } from '../library/common';
import { filter, tap } from 'rxjs/operators';

export interface ITransCommonService {
  do(event: EEvents, source: TTranslateMode, transId: string): void
  onEvent(event: EEvents): Observable<ISelectedTranslateString>;

}

@Injectable()
export class TransCommonService implements ITransCommonService {
  private _onSelectSubject: BehaviorSubject<ISelectedTranslateString> = new BehaviorSubject(null);

  private onEvent$: Observable<ISelectedTranslateString> = this._onSelectSubject.asObservable();

  public onEvent(event: EEvents) {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((item: ISelectedTranslateString) => item.event === event),
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }

  public do(event: EEvents, source: TTranslateMode, transId: string): void {
    this._onSelectSubject.next({ source, transId, event: EEvents.MOUSE_DOWN })
  }

}
