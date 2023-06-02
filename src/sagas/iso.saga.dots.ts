import { call } from 'redux-saga/effects';
import { put, select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { actions } from '../store/iso.actions';
import { IDot, IPosFlat } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import { newDotAll } from './iso.saga.newDot';
import { getFlatPos, toFlatPos } from './utils/vectors';
import { scene } from '../isokit.globals';

type Verb = 'click' | 'move' | 'unselect' | 'delete' | 'new';

export type ActionDot = {
  type: 'mesh';
  verb: Verb;
  params: { dot: IDot } & Json;
};

const mapVerbToSaga: Record<Verb, any> = {
  new: newDotAll,
  click: clickDot,
  move: moveDot,
  unselect: unselectDot,
  delete: deleteDot,
};

export function* clickDot(action: ActionDot) {
  const { params } = action;
  const { dot } = params;

  yield put(actions.isoState.patch({ dotId: dot.id }));
}

export function* onDotChange(action: any) {
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
  yield put(actions.isoState.patch({ dotId: '' }));
}

export function* moveDot(action: ActionDot) {
  const { params } = action;
  const { dot, percent } = params;

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { totalDuration } = isoState;

  const timestamp = Math.max(totalDuration * percent * 1000, 0);

  yield put(actions.dots.patch(dot.id, { timestamp }));
}

export function* deleteDot(action: ActionDot) {
  const { params } = action;
  const { dot } = params;

  yield put(actions.dots.delete(dot.id));
}

export function* syncDot(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId } = isoState;

  const car = scene.getMeshByName('car');

  if (!car) {
    return;
  }

  const flatPos = toFlatPos({
    position: car.position,
    rotation: car.rotation,
  });

  console.log('flatPos ->', flatPos);

  yield call(patchParams, dotId, flatPos as any);

  invokeEvent('iso/pos', flatPos);
}

export function* controlDot(action: any) {
  const { data } = action;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId } = isoState;

  if (!dotId) {
    return;
  }

  yield call(patchParams, dotId, data);
}

export function* copyDots(action: any) {
  const dots = yield* select(selectors.components.$dotsForClipboard);

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

export function* patchExtraParams(dotId: string, paramsChange: Json) {
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
  const { verb } = action;

  const saga = mapVerbToSaga[verb];

  if (!saga) {
    return;
  }

  yield* saga(action);
}
