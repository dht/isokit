import { generateReducersForStore } from 'redux-store-generator';
import { root } from '../sagas/iso.saga.index';
import { initialState } from './initialState/iso.initialState';
import { IIsoStore } from './iso.types';
import { actions } from './iso.actions';

export const reducers = generateReducersForStore<IIsoStore>(initialState);

export const initIsoStore = (storeBuilder: any) => {
  storeBuilder.withReducers(reducers).withInitialState(initialState).withSagas(root);
};

export const clearState = (store: any) => {
  setTimeout(() => {});

  return store;
};
