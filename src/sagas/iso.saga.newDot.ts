import { call } from 'redux-saga/effects';
import { put, select } from 'saga-ts';
import { guid4 } from 'shared-base';
import { scene } from '../isokit.globals';
import { actions } from '../store/iso.actions';
import { IDot } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import type { ActionDot } from './iso.saga.dots';
import * as v from './utils/vectors';
import { createDot } from './helpers/dots';
import { ArcRotateCamera } from '@babylonjs/core';

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

  yield call(
    createDot,
    {
      timestamp,
      itemId: meshId,
      layerId: 'dots',
      dotType: 'mesh',
      params: v.toFlatPos(
        {
          position: mesh.position,
          rotation: mesh.rotation,
          scaling: mesh.scaling,
        },
        2
      ),
    },
    true
  );
}

export function* newDotCamera(action: ActionDot, cameraId: string) {
  const { params } = action;
  const { timestamp } = params;

  const previousDot = yield* select(selectors.playback.$dotsPrevious, timestamp);
  const previousParams = previousDot ? previousDot.params : {};

  console.log('previousParams ->', previousParams);

  const camera = scene.getCameraByName(cameraId);
  const isArc = camera instanceof ArcRotateCamera;

  return;

  yield call(
    createDot,
    {
      timestamp,
      itemId: cameraId,
      dotType: isArc ? 'camera-arc' : 'camera-universal',
      layerId: 'dots',
      params: {
        ...previousParams,
      },
    },
    true
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

  yield call(
    createDot,
    {
      timestamp,
      itemId,
      layerId: 'viz',
      dotType: 'viz',
      params: {
        show: true,
      },
    },
    true
  );
}

export function* newSkyDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  yield call(
    createDot,
    {
      itemId: '',
      layerId: 'sky',
      dotType: 'sky',
      timestamp,
      params: {
        url: '',
      },
    },
    true
  );
}

export function* newHudDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  yield call(
    createDot,
    {
      timestamp,
      itemId: '',
      layerId: 'hud',
      dotType: 'hud',
      params: {
        hudId: '',
      },
    },
    true
  );
}

export function* newSfxDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  yield call(
    createDot,
    {
      timestamp,
      itemId: '',
      layerId: 'sfx',
      dotType: 'sfx',
      params: {
        url: '',
      },
    },
    true
  );
}

export function* newVfxDot(action: ActionDot) {
  const { params } = action;
  const { timestamp } = params;

  yield call(
    createDot,
    {
      timestamp,
      itemId: '',
      layerId: 'vfx',
      dotType: 'vfx',
      params: {
        url: '',
      },
    },
    true
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
