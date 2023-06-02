import { generateReducersForStore } from 'redux-store-generator';
import { root } from '../sagas/iso.saga.index';
import { initialState } from './iso.initialState';
import { IIsoStore } from './iso.types';

export const reducers = generateReducersForStore<IIsoStore>(initialState);

export const initIsoStore = (storeBuilder: any) => {
  storeBuilder //
    .withReducers(reducers)
    .withInitialState(initialState)
    .withSagas(root);
};
