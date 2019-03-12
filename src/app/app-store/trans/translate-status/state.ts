import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IFormState} from "../../../../interfaces";


export const featureName = 'TRANS_STATUS';


export const featureAdapter: EntityAdapter<IFormState> = createEntityAdapter<IFormState>({
  selectId: model => model.formId,
});


export interface State extends EntityState<IFormState> {
  active: string;


}

export const initialState: State = featureAdapter.getInitialState({active: null});
