import { StoreSelectors as SelectorsOriginal } from './original';
import { StoreSelectors as SelectorsTranslated } from './translated';
import { EntityStore } from '@app-lib/store/entity/selectors';
import { IAppState } from '@app/app-store/app-store.module';

import {
  IEntityOriginalStatus, IEntityOriginal,
  IEntityTranslatedStatus, IEntityTranslated, EEntityType, ITranslateEntity
} from '@app/types/trans';
import { IEntityStatus } from '@app/types';

export interface IEntitySelectos {
  [in EEntityType]: EntityStore.IEntitySelectors<IAppState, ITranslateEntity, IEntityStatus>
};

export const EntitySelectors: IEntitySelectos = {
  original: SelectorsOriginal,
  translated: SelectorsTranslated,
}
