import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ETranslatedEvents, ISelectedTranslateString } from '../library/common';

export interface ITranslatedService {
  do(event: ETranslatedEvents, transId: string, data?: any): void
  onEvent(event: ETranslatedEvents): Observable<ISelectedTranslateString>;

}

@Injectable()
export class TranslatedService implements ITranslatedService {
  private _onSelectSubject: BehaviorSubject<ISelectedTranslateString> = new BehaviorSubject(null);

  private onEvent$: Observable<ISelectedTranslateString> = this._onSelectSubject.asObservable();

  public onEvent(event: ETranslatedEvents) {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((item: ISelectedTranslateString) => item.event === event),
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }

  public do(event: ETranslatedEvents, transId: string, data?: any): void {
    this._onSelectSubject.next({ transId, event, data })
  }

}
