import { StoreSelectors as SelectorsOriginal } from './original';
import { StoreSelectors as SelectorsTranslated } from './translated';



export interface IEntitySelectos {
  // [in EEntityType]: EntityStore.IEntitySelectors<IAppState, ITranslateEntity, IEntityStatus>
};

export const EntitySelectors: IEntitySelectos = {
  original: SelectorsOriginal,
  translated: SelectorsTranslated,
}
