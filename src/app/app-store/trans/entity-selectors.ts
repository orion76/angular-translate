import { StoreSelectors as SelectorsOriginal } from './original';
import { StoreSelectors as SelectorsTranslated } from './translated';
import { IEntityOriginal, IOriginalStatus, ITranslatedStatus, IEntityTranslated } from '@app/types';
import { IEntitySelectors } from '@app-library/store/entity';
import { IRequestOriginal, IRequestTranslated } from '@app-library/store/types';



export interface ITranslateSelectors {
  original: IEntitySelectors<IRequestOriginal, IEntityOriginal, IOriginalStatus>,
  translated: IEntitySelectors<IRequestTranslated, IEntityTranslated, ITranslatedStatus>
};

export const EntitySelectors: ITranslateSelectors = {
  original: SelectorsOriginal,
  translated: SelectorsTranslated,
}
