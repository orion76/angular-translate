import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ETranslateEvents, ISelectedLine, EOriginalEvents } from '../library/common';


export namespace Actions {
  export enum Types {
    ENTITY_ID = '[ORIGINAL] ENTITY_ID_COMPLETE',
    LOADED = '[ORIGINAL] LOADED',
    MOUSE_OUT = '[ORIGINAL] mouseout',
    MOUSE_DOWN = '[ORIGINAL] mousedown',
    UPDATE = '[ORIGINAL] UPDATE',
    UPDATE_COMPLETE = '[ORIGINAL] UPDATE_COMPLETE'
  }

  export class completeEntityId{
    type: Types.ENTITY_ID;
    constructor(){}
  }
}

export interface IOriginalService {
  do(event: EOriginalEvents, transId: string, data?: any): void
  on(event: EOriginalEvents): Observable<ISelectedLine>;

}

@Injectable()
export class OriginalService implements IOriginalService {
  private _onSelectSubject: BehaviorSubject<ISelectedLine> = new BehaviorSubject(null);

  private onEvent$: Observable<ISelectedLine> = this._onSelectSubject.asObservable();

  public on(event: EOriginalEvents) {
    return this.onEvent$.pipe(
      filter(Boolean),
      filter((item: ISelectedLine) => item.event === event),
      // tap((item: ISelectedTranslateString) => console.log('onEvent', EEvents[item.event], item))
    )
  }

  onEntityId() {
    // IOriginalEntity
  }

  public do(event: ETranslateEvents, transId: string, data?: any): void {
    this._onSelectSubject.next({ transId, event, data })
  }

}
