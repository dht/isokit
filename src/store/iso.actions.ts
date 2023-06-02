import { generateActionsForStore } from 'redux-store-generator';
import { initialState } from './iso.initialState';
import { IIsoStore } from './iso.types';

export const actions = generateActionsForStore<IIsoStore>(initialState);
