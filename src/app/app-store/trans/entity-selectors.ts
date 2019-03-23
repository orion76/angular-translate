import { StoreSelectors as SelectorsOriginal } from './original';
import { StoreSelectors as SelectorsTranslated } from './translated';
import { IEntityOriginal, IEntityOriginalStatus, IEntityTranslatedStatus, IEntityTranslated } from '@app/types';
import { IEntitySelectors } from '@app-library/store/entity';



export interface ITranslateSelectors {
  original: IEntitySelectors,
  translated: IEntitySelectors
};

export const EntitySelectors: ITranslateSelectors = {
  original: SelectorsOriginal,
  translated: SelectorsTranslated,
}
