export interface Action {
  readonly type: string;
}

export enum EMouseEvent {

  MOUSE_ENTER = 'mouseenter',
  MOUSE_OUT = 'mouseout',
  MOUSE_DOWN = 'mousedown',

}


export interface ISelectedLine {

  originalId: string,
  lineIdPrev: string;
  lineId: string;
}

export interface ILineEvent {
  event: EMouseEvent;
  line: ISelectedLine
}

export interface ITranslateData {
  transId: string,
  original: string,
  translated: string
}
