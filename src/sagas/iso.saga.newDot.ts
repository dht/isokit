import { call } from 'redux-saga/effects';
import { put, select } from 'saga-ts';
import { guid4 } from 'shared-base';
import { scene } from '../isokit.globals';
import { actions } from '../store/iso.actions';
import { IDot } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import type { ActionDot } from './iso.saga.dots';
import * as v from './utils/vectors';

const mapLayerToSaga: Record<string, any> = {
  dots: newDot,
  viz: newVizDot,
  sky: newSkyDot,
  hud: newHudDot,
  sfx: newSfxDot,
  vfx: newVfxDot,
};

export function* newDotMesh(action: ActionDot, meshId: string) {
  const { params } = action;
  const { timestamp } = params;

  console.log('meshId ->', meshId);

  const mesh = scene.getMeshById(meshId);

  if (!mesh) {
    return;
  }

  const dot: IDot = {
    id: guid4(),
    timestamp,
    itemId: meshId,
    layerId: 'dots',
    params: v.toFlatPos(
      {
        position: mesh.position,
        rotation: mesh.rotation,
      },
      2
    ),
  };

  yield put(actions.dots.add(dot));

  yield put(
    actions.isoState.patch({
      dotId: dot.id,
    })
  );
}

export function* newDotCamera(action: ActionDot, cameraId: string) {
  const { params } = action;
  const { timestamp } = params;

  const previousDot = yield* select(selectors.playback.$dotsPrevious, timestamp);
  const previousParams = previousDot ? previousDot.params : {};

  console.log('previousParams ->', previousParams);

  return;

  const dot: IDot = {
    id: guid4(),
    timestamp,
    itemId: cameraId,
    layerId: 'dots',
    params: {
      ...previousParams,
    },
  };

  yield put(actions.dots.add(dot));

  yield put(
    actions.isoState.patch({
      dotId: dot.id,
    })
  );
}

export function* newDot(action: ActionDot) {
  const { meshId, cameraId } = yield* select(selectors.raw.$rawIsoState);

  const isMesh = !!meshId;

  if (!isMesh) {
    yield call(newDotCamera, action, cameraId);
  } else {
    yield call(newDotMesh, action, meshId);
  }
}

export function* newVizDot(action: ActionDot) {
  const { meshId, cameraId } = yield* select(selectors.raw.$rawIsoState);

  const { params } = action;
  const { timestamp } = params;

  const isMesh = !!meshId;
  const itemId = isMesh ? meshId : cameraId;

  const dot: IDot = {
    id: guid4(),
    timestamp,
    itemId,
    layerId: 'viz',
    params: {
      show: true,
    },
  };

  yield put(actions.dots.add(dot));

  yield put(
    actions.isoState.patch({
      dotId: dot.id,
    })
  );
}

export function* newSkyDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  const dot: IDot = {
    id: guid4(),
    itemId: '',
    layerId: 'sky',
    timestamp,
    params: {
      url: '',
    },
  };

  yield put(actions.dots.add(dot));

  yield put(
    actions.isoState.patch({
      dotId: dot.id,
    })
  );
}

export function* newHudDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  const dot: IDot = {
    id: guid4(),
    timestamp,
    itemId: '',
    layerId: 'hud',
    params: {
      hudId: '',
    },
  };

  yield put(actions.dots.add(dot));

  yield put(
    actions.isoState.patch({
      dotId: dot.id,
    })
  );
}

export function* newSfxDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  const dot: IDot = {
    id: guid4(),
    timestamp,
    itemId: '',
    layerId: 'sfx',
    params: {
      url: '',
    },
  };

  yield put(actions.dots.add(dot));

  yield put(
    actions.isoState.patch({
      dotId: dot.id,
    })
  );
}

export function* newVfxDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  const dot: IDot = {
    id: guid4(),
    timestamp,
    itemId: '',
    layerId: 'vfx',
    params: {
      url: '',
    },
  };

  yield put(actions.dots.add(dot));

  yield put(
    actions.isoState.patch({
      dotId: dot.id,
    })
  );
}

export function* newDotAll(action: ActionDot) {
  const { layerId } = yield* select(selectors.raw.$rawIsoState);

  const saga = mapLayerToSaga[layerId];

  console.log('layerId ->', layerId);

  if (!saga) {
    return;
  }

  yield* saga(action);
}
