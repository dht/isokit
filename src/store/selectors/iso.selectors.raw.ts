import { createSelector } from 'reselect';
import { IIsoStore } from '../iso.types';
import { pickBy } from 'lodash';

export const $i = (state: IIsoStore) => state;
export const $n = (): null => null;
export const $o = (): void => {};

export const $rawIsoState = createSelector($i, (state: IIsoStore) =>state.isoState); // prettier-ignore
export const $rawPlayState = createSelector($i, (state: IIsoStore) => state.playState); // prettier-ignore
export const $rawGroups = createSelector($i, (state: IIsoStore) => state.groups); // prettier-ignore
export const $rawDots = createSelector($i, (state: IIsoStore) => pickBy(state.dots, i => i.layerId === 'dots')); // prettier-ignore
export const $rawVizDots = createSelector($i, (state: IIsoStore) => pickBy(state.dots, i => i.layerId === 'viz')); // prettier-ignore
export const $rawSfxDots = createSelector($i, (state: IIsoStore) => pickBy(state.dots, i => i.layerId === 'sfx')); // prettier-ignore
export const $rawVfxDots = createSelector($i, (state: IIsoStore) => pickBy(state.dots, i => i.layerId === 'vfx')); // prettier-ignore
export const $rawHudDots = createSelector($i, (state: IIsoStore) => pickBy(state.dots, i => i.layerId === 'hud')); // prettier-ignore
export const $rawSkyDots = createSelector($i, (state: IIsoStore) => pickBy(state.dots, i => i.layerId === 'sky')); // prettier-ignore
export const $rawSceneItems = createSelector($i, (state: IIsoStore) => state.sceneItems); // prettier-ignore
export const $rawLayers = createSelector($i, (state: IIsoStore) => state.layers); // prettier-ignore
