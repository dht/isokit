import { call, fork, take, takeEvery, takeLatest } from 'saga-ts';
import { toggleGizmo } from '../isokit.gizmos';
import { customEvenChannel } from './channels/iso.channel.customEvent';
import { createIntervalChannel } from './channels/iso.channel.interval';
import { createKeyDownChannel } from './channels/iso.channel.keys';
import { createMouseDownChannel } from './channels/iso.channel.mouse';
import {
  predicateAppState,
  predicateIsoState,
  predicateIsoStateArr,
  predicatePlay,
} from './helpers/predicates';
import { checkIfReady, playChange, startOver } from './iso.saga.beat';
import { listenToCamera, onCameraChange } from './iso.saga.cameras';
import { changeControlsDefinition, changeParamId, controls } from './iso.saga.controls';
import { checkMouseDown, onMouseDown } from './iso.saga.dimmer';
import { dotsVerb, onDotChange, setEasing } from './iso.saga.dots';
import { onFunctionKeys, onNumbers, onShortKeys, toggleLog } from './iso.saga.keys';
import { root as rootLogOnAction } from './iso.saga.log';
import { onMeshChange } from './iso.saga.meshes';
import { loadDots, loadIsoState, saveDots, saveIsoState } from './iso.saga.persistence';
import { onPadMove, onPadStart } from './iso.saga.placement';
import { onDataIsReady, onSixtyIsReady, playback } from './iso.saga.playback';
import { regions } from './iso.saga.regions';
import { selectItem } from './iso.saga.selection';
import { onShotChange, onShotDrillDown, onShotDrillDownClear } from './iso.saga.shots';
import { onMuteChange, waveformReady, waveformSeek } from './iso.saga.sound';
import { toggleCenterBall } from '../isokit.effects';
import { listenToSetPiece } from './iso.saga.setPiece';
import { createSceneChannel } from './channels/iso.channel.scene';
import { scene } from '../isokit.globals';
import { onRender } from './iso.saga.scene';
import { syncEverySecond } from './iso.saga.sync';

export function* rootIso() {
  // bootstrap
  yield takeEvery('SIXTY_LOADED', onSixtyIsReady);

  // beat
  yield takeEvery(predicatePlay('playbackStatus'), playChange);
  yield takeEvery(predicateIsoState('isAudioReady'), checkIfReady);
  yield takeEvery(predicateIsoState('isDataReady'), checkIfReady);
  yield takeEvery(predicateIsoState('isBoardReady'), checkIfReady);

  let channel;

  channel = yield* call(customEvenChannel, 'iso/prev');
  yield takeEvery(channel, startOver);

  // cameras
  yield takeEvery(predicateIsoState('cameraId', true), onCameraChange);

  // controls
  channel = yield* call(customEvenChannel, 'iso/controls');
  yield takeEvery(channel, controls);

  yield takeEvery(
    predicateIsoStateArr(['layerId', 'paramsId', 'dotId', 'cameraId', 'meshId']),
    changeControlsDefinition
  );

  // dimmer
  channel = createIntervalChannel(1000);
  yield takeEvery(channel, checkMouseDown);
  channel = createMouseDownChannel();
  yield takeEvery(channel, onMouseDown);

  // dots
  yield takeEvery('iso/dot', dotsVerb);
  yield takeEvery(predicateIsoState('dotId', true), onDotChange);
  yield takeEvery('iso/easing', setEasing);
  yield takeEvery('iso/params', changeParamId);

  // meshes
  yield takeEvery(predicateIsoState('meshId', true), onMeshChange);

  // playback
  channel = customEvenChannel('waveform/timeupdate');
  yield takeEvery(channel, playback);

  // regions
  channel = customEvenChannel('waveform/timeupdate');
  yield takeEvery(channel, regions);

  // selection
  yield takeEvery('iso/selection', selectItem);

  // gizmo & center ball
  yield takeEvery(predicateIsoState('isGizmoOn'), toggleGizmo);
  yield takeEvery(predicateIsoState('isCenterBallOn'), toggleCenterBall);

  // shots
  yield takeEvery(predicateIsoState('shotId'), onShotChange);
  yield takeEvery(predicateIsoState('focusedShotId', true), onShotDrillDown);
  yield takeEvery(predicateIsoState('focusedShotId'), onShotDrillDownClear);

  // sound
  channel = yield* call(customEvenChannel, 'waveform/ready');
  yield takeEvery(channel, waveformReady);

  channel = yield* call(customEvenChannel, 'waveform/seek');
  yield takeEvery(channel, waveformSeek);

  yield takeEvery(predicateIsoState('isVolumeOn'), onMuteChange);

  // sync
  yield* fork(syncEverySecond);

  // pad
  channel = yield* call(customEvenChannel, 'pad/start');
  yield takeEvery(channel, onPadStart);
  channel = yield* call(customEvenChannel, 'pad/move');
  yield takeEvery(channel, onPadMove);

  // keys
  channel = yield* call(createKeyDownChannel, ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']); // prettier-ignore
  yield takeEvery(channel, onFunctionKeys);

  channel = yield* call(createKeyDownChannel, ['c', 'd', 'l', 'm']);
  yield takeEvery(channel, onShortKeys);

  channel = yield* call(createKeyDownChannel, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]); // prettier-ignore
  yield takeEvery(channel, onNumbers);

  // data ready
  yield takeEvery(predicateAppState('isDataReady', true), onDataIsReady);

  // camera
  yield* fork(listenToCamera);

  // setPiece
  yield* fork(listenToSetPiece);

  // persistence
  yield takeLatest('PATCH_ISOSTATE', saveIsoState);
  yield fork(loadIsoState);
  yield takeLatest(['PATCH_DOT', 'DELETE_DOT'], saveDots);
  yield fork(loadDots);

  // scene
  yield take(predicateIsoState('isBoardReady', true));
  channel = createSceneChannel(scene, 300);
  yield takeEvery(channel, onRender);
}
