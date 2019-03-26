import { IEntitySelectors } from '@app-library/store/entity';
import { IEntityRequest, IEntityStatus, IRequestTranslated } from '@app-library/store/types';
import { IEntityTranslate } from '@app/types';
import { StoreSelectors as SelectorsOriginal } from './original';
import { StoreSelectors as SelectorsTranslated } from './translated';



export interface ITranslateSelectors {
  original: IEntitySelectors<IEntityRequest, IEntityTranslate, IEntityStatus>,
  translated: IEntitySelectors<IRequestTranslated, IEntityTranslate, IEntityStatus>
};

export const EntitySelectors: ITranslateSelectors = {
  original: SelectorsOriginal,
  translated: SelectorsTranslated,
}
