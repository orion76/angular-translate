export type TTranslateMode = 'original' | 'translated';

export enum EEvents {
  MOUSE_ENTER = 'mouseenter',
  MOUSE_OUT = 'mouseout',
  MOUSE_DOWN = 'mousedown'
}

export interface ISelectedTranslateString {
  event: EEvents;
  source: TTranslateMode;
  transId: string
}


export interface ITranslateData {
  original: string,
  translated: string
}
