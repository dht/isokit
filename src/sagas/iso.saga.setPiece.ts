import { takeEvery } from 'redux-saga/effects';
import { call, put, select, take } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { createIntervalChannel } from './channels/iso.channel.interval';
import { createDot } from './helpers/dots';
import { meshFlatPos } from './utils/vectors';

export function* syncSetPiece(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const playState = yield* select(selectors.raw.$rawPlayState);
  const { layerId, cameraId, meshId, paramsId, focusedShotId } = isoState;

  if (playState.playbackStatus === 'playing') {
    return;
  }

  if (layerId !== 'dots' || paramsId !== 'setPiece' || !focusedShotId) {
    return;
  }

  const dot = yield* call(findOrCreateDot);

  if (meshId) {
    yield call(syncMesh, meshId, dot);
  } else if (cameraId) {
    yield call(syncMesh, cameraId, dot);
  }
}

export function* syncMesh(_meshId: string, dot: any) {
  const pos = yield* select(selectors.pos.$allPos, {});

  yield* put(
    actions.dots.patch(dot.id, {
      params: pos.meshSelected,
    })
  );
}

export function* syncCamera(_cameraId: string, dot: any) {
  const pos = yield* select(selectors.pos.$allPos, {});

  yield* put(
    actions.dots.patch(dot.id, {
      params: pos.cameraSelected,
    })
  );
}

export function* findOrCreateDot() {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const dots = yield* select(selectors.playback.$dots);
  const { layerId, cameraId, meshId, focusedShotId } = isoState;

  const dot = dots.find((dot) => {
    const isRightDot = dot.itemId === meshId || dot.itemId === cameraId;
    return dot.isSetPiece && dot.shotId === focusedShotId && isRightDot;
  });

  if (dot) {
    return dot;
  }

  const timelineRegion = yield* select(selectors.playback.$timelineRegion);

  const newDot = yield* call(createDot, {
    timestamp: timelineRegion.start,
    itemId: meshId || cameraId,
    shotId: focusedShotId,
    isSetPiece: true,
    layerId: layerId as any,
  });

  return newDot;
}

export function* listenToSetPiece() {
  yield take('BOARD_LOAD_DONE');
  const channel = createIntervalChannel(1000);
  yield takeEvery(channel, syncSetPiece);
}
