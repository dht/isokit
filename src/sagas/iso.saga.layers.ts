import { put, select } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';

type Verb = 'nextLayer';

export type ActionDot = {
  type: 'layer';
  verb: Verb;
  params: Json;
};

const mapVerbToSaga: Record<Verb, any> = {
  nextLayer: nextLayer,
};

export function* nextLayer() {
  const layers = yield* select(selectors.raw.$rawLayers);
  const isoState = yield* select(selectors.raw.$rawIsoState);

  const { layerId } = isoState;

  const activeLayers = Object.values(layers).filter((layer: any) => layer.isActive);

  const index = activeLayers.findIndex((layer: any) => layer.id === layerId);

  const nextIndex = index + 1;

  const nextLayer = activeLayers[nextIndex] ?? activeLayers[0];

  if (!nextLayer) {
    return;
  }

  yield put(actions.isoState.patch({ layerId: nextLayer.id }));
}

export function* resetLayer() {
  yield put(actions.isoState.patch({ layerId: 'dots' }));
}

export function* dotsVerb(action: ActionDot) {
  const { verb } = action;

  const saga = mapVerbToSaga[verb];

  if (!saga) {
    return;
  }

  yield* saga(action);
}
