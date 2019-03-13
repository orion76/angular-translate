import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISelectedTranslateString, EEvents } from '../library/common';
import { filter, tap } from 'rxjs/operators';

export interface ITranslatedService {
  do(event: EEvents, transId: string, data?: any): void
  onEvent(event: EEvents): Observable<ISelectedTranslateString>;

}

@Injectable()
export class TranslatedService implements ITranslatedService {
  private _onSelectSubject: BehaviorSubject<ISelectedTranslateString> = new BehaviorSubject(null);

  private onEvent$: Observable<ISelectedTranslateString> = this._onSelectSubject.asObservable();

  public onEvent(event: EEvents) {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((item: ISelectedTranslateString) => item.event === event),
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }

  public do(event: EEvents, transId: string, data?: any): void {
    this._onSelectSubject.next({ transId, event, data })
  }

}
