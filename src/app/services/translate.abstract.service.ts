import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ETranslateEvents, ISelectedLine, EOriginalEvents } from '../library/common';
import { ITranslateProcess } from '@app/components/translate/process/translate-process';


export interface ITranslateService {

}


export class TranslateAbstractService implements ITranslateService {
  private _onSelectSubject: BehaviorSubject<ISelectedLine> = new BehaviorSubject(null);

  private onEvent$: Observable<ISelectedLine> = this._onSelectSubject.asObservable();

  constructor(private process: ITranslateProcess) {

  }

  public do(event: ETranslateEvents, transId: string, data?: any): void {
    this._onSelectSubject.next({ transId, event, data })
  }

}
