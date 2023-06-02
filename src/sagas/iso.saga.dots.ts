import { put, select } from 'saga-ts';
import { guid4, invokeEvent } from 'shared-base';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { IDot, IPosFlat } from '../store/iso.types';
import { log } from './helpers/log';
import { getFlatPos } from './utils/vectors';
import { call } from 'redux-saga/effects';

type Verb = 'click' | 'move' | 'unselect' | 'delete' | 'new';

type ActionDot = {
  type: 'mesh';
  verb: Verb;
  params: { dot: IDot } & Json;
};

const mapVerbToSaga: Record<Verb, any> = {
  new: newDot,
  click: clickDot,
  move: moveDot,
  unselect: unselectDot,
  delete: deleteDot,
};

export function* newDot(action: ActionDot) {
  log('newDot', action);
  const { meshId, cameraId } = yield* select(selectors.raw.$rawIsoState);

  const isCamera = !!cameraId;
  const itemId = isCamera ? cameraId : meshId;

  const { params } = action;
  const { timestamp } = params;

  const dot: IDot = {
    id: guid4(),
    timestamp,
    itemId,
    params: {},
  };

  yield put(actions.dots.patch(dot.id, dot));
}

export function* clickDot(action: ActionDot) {
  log('clickDot', action);

  const { params } = action;
  const { dot } = params;

  yield put(actions.isoState.patch({ dotId: dot.id }));
}

export function* onDotChange(action: any) {
  log('onDotChange', action);

  const { payload = {} } = action;
  const { dotId } = payload;

  const dot = yield* select(selectors.singles.$dot, dotId);

  if (!dot) {
    return;
  }

  const { params } = dot;

  invokeEvent('iso/pos', {
    ...params,
    clearEmpty: true,
  });
}

export function* unselectDot(_action: ActionDot) {
  log('unselectDot');

  yield put(actions.isoState.patch({ dotId: '' }));
}

export function* moveDot(action: ActionDot) {
  log('moveDot', action);

  const { params } = action;
  const { dot, percent } = params;

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { totalDuration } = isoState;

  const timestamp = totalDuration * percent * 1000;

  yield put(actions.dots.patch(dot.id, { timestamp }));
}

export function* deleteDot(action: ActionDot) {
  log('deleteDot', action);

  const { params } = action;
  const { dot } = params;

  yield put(actions.dots.delete(dot.id));
}

export function* syncDot(action: any) {
  log('syncDot', action);

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId } = isoState;
  const flatPos = getFlatPos(2);

  yield call(patchParams, dotId, flatPos as any);

  invokeEvent('iso/pos', flatPos);
}

export function* controlDot(action: any) {
  log('controlDot', action);

  const { data } = action;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId } = isoState;

  if (!dotId) {
    return;
  }

  yield call(patchParams, dotId, data);
}

export function* copyDots(action: any) {
  log('copyDots');

  const dots = yield* select(selectors.base.$dotsForClipboard);

  // copy to clipboard
  const text = JSON.stringify(dots, null, 2);
  navigator.clipboard.writeText(text);
}

export function* setEasing(action: any) {
  const { value, controlPoints } = action;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId } = isoState;

  if (!dotId) {
    return;
  }

  const flatPos: any = {};

  switch (value) {
    case 'none':
      flatPos.b1 = '';
      flatPos.b2 = '';
      flatPos.b3 = '';
      flatPos.b4 = '';
      flatPos.isAnimated = false;
      break;
    case 'linear':
      flatPos.b1 = 0.5;
      flatPos.b2 = 0.5;
      flatPos.b3 = 0.5;
      flatPos.b4 = 0.5;
      flatPos.isAnimated = true;
      break;
    case 'easeInOut':
      flatPos.b1 = 0.17;
      flatPos.b2 = 0.67;
      flatPos.b3 = 0.83;
      flatPos.b4 = 0.67;
      flatPos.isAnimated = true;
      break;
    case 'custom':
      flatPos.b1 = controlPoints[0];
      flatPos.b2 = controlPoints[1];
      flatPos.b3 = controlPoints[2];
      flatPos.b4 = controlPoints[3];
      break;
  }

  yield call(patchParams, dotId, flatPos);

  invokeEvent('iso/pos', flatPos);
}

export function* patchParams(dotId: string, paramsChange: IPosFlat) {
  const dot = yield* select(selectors.singles.$dot, dotId);

  if (!dot) {
    return;
  }

  const { params = {} } = dot;

  const newParams = {
    ...params,
    ...paramsChange,
  };

  yield put(actions.dots.patch(dotId, { params: newParams }));
}

export function* dotsVerb(action: ActionDot) {
  log('dotsVerb', action);

  const { verb } = action;

  const saga = mapVerbToSaga[verb];

  if (!saga) {
    return;
  }

  yield* saga(action);
}
