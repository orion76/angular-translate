
import { reducer } from './reducer';
import { StoreState } from './state';
// import { TranslateOriginalEffects as effects } from './effects';
import featureName = StoreState.featureName

export const OriginalStatus = {
  reducer,
  featureName,
  // effects
};
