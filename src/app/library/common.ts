export interface Action {
  readonly type: string;
}

export enum ETranslateEvents {

  MOUSE_ENTER = 'mouseenter',
  MOUSE_OUT = 'mouseout',
  MOUSE_DOWN = 'mousedown',
  TRANSLATED_UPDATE = 'TRANSLATED_UPDATE',
  TRANSLATED_UPDATE_COMPLETE = 'TRANSLATED_UPDATE_COMPLETE'
}

export enum EOriginalEvents {
  ENTITY_ID = 'ENTITY_ID_COMPLETE',
  LOADED = 'LOADED',
  MOUSE_OUT = 'mouseout',
  MOUSE_DOWN = 'mousedown',
  TRANSLATED_UPDATE = 'TRANSLATED_UPDATE',
  TRANSLATED_UPDATE_COMPLETE = 'TRANSLATED_UPDATE_COMPLETE'
}

export interface ISelectedLine {
  event: ETranslateEvents;
  originalId: string,
  transId: string;
  data?: any
}


export interface ITranslateData {
  transId: string,
  original: string,
  translated: string
}
