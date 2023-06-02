import { createSelector } from 'reselect';
import { IIsoStore } from '../iso.types';

export const $i = (state: IIsoStore) => state;
export const $n = (): null => null;
export const $o = (): void => {};

export const $rawIsoState = createSelector($i, (state: IIsoStore) =>state.isoState); // prettier-ignore
export const $rawItems = createSelector($i, (state: IIsoStore) => state.items); // prettier-ignore
export const $rawPlay = createSelector($i, (state: IIsoStore) => state.play); // prettier-ignore
export const $rawGroups = createSelector($i, (state: IIsoStore) => state.groups); // prettier-ignore
export const $rawDots = createSelector($i, (state: IIsoStore) => state.dots); // prettier-ignore
export const $rawVisDots = createSelector($i, (state: IIsoStore) => state.visDots); // prettier-ignore
export const $rawSfxDots = createSelector($i, (state: IIsoStore) => state.sfxDots); // prettier-ignore
