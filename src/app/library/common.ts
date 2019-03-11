

export enum EEvents {
  MOUSE_ENTER = 'mouseenter',
  MOUSE_OUT = 'mouseout',
  MOUSE_DOWN = 'mousedown',
  TRANSLATED_UPDATE = 'TRANSLATED_UPDATE',
  TRANSLATED_UPDATE_COMPLETE = 'TRANSLATED_UPDATE_COMPLETE'
}

export interface ISelectedTranslateString {
  event: EEvents;
  transId: string;
  data?: any
}


export interface ITranslateData {
  transId: string,
  original: string,
  translated: string
}
