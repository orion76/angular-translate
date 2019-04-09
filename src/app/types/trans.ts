export interface IFieldTypeLink {
  uri: string;
  title: string;
}


export interface ISyncState {
  originalId: string;
  translatedId: string;
  lineIdPrev: string;
  lineId: string;
  originalScroll: number;
  translatedScroll: number;
}
