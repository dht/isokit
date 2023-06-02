import { call, fork, takeEvery, takeLatest } from 'saga-ts';
import { customEvenChannel } from './channels/iso.channel.customEvent';
import { createIntervalChannel } from './channels/iso.channel.interval';
import { createKeyDownChannel } from './channels/iso.channel.keys';
import { createMouseDownChannel } from './channels/iso.channel.mouse';
import { predicateAppState, predicateIsoState, predicatePlay } from './helpers/predicates';
import { checkIfReady, playChange, startOver } from './iso.saga.beat';
import { listenToCamera, onCameraChange } from './iso.saga.cameras';
import { controls } from './iso.saga.controls';
import { checkMouseDown, onMouseDown } from './iso.saga.dimmer';
import { copyDots, dotsVerb, onDotChange, setEasing } from './iso.saga.dots';
import { onNumbers, toggleLog, togglePerspective, toggleWaveform } from './iso.saga.keys';
import { onMeshChange } from './iso.saga.meshes';
import { loadDots, loadIsoState, saveDots, saveIsoState } from './iso.saga.persistence';
import { onPadMove, onPadStart } from './iso.saga.placement';
import { onDataIsReady, onSixtyIsReady, playback } from './iso.saga.playback';
import { regions } from './iso.saga.regions';
import { selectItem } from './iso.saga.selection';
import { onMuteChange, waveformReady, waveformSeek } from './iso.saga.sound';
import { syncParams } from './iso.saga.sync';

export function* root() {
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

  // dimmer
  channel = createIntervalChannel(1000);
  yield takeEvery(channel, checkMouseDown);
  channel = createMouseDownChannel();
  yield takeEvery(channel, onMouseDown);

  // dots
  yield takeEvery('iso/dot', dotsVerb);
  yield takeEvery(predicateIsoState('dotId', true), onDotChange);
  yield takeEvery('iso/easing', setEasing);

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

  // sound
  channel = yield* call(customEvenChannel, 'waveform/ready');
  yield takeEvery(channel, waveformReady);

  channel = yield* call(customEvenChannel, 'waveform/seek');
  yield takeEvery(channel, waveformSeek);

  yield takeEvery(predicateIsoState('isVolumeOn'), onMuteChange);

  // pad
  channel = yield* call(customEvenChannel, 'pad/start');
  yield takeEvery(channel, onPadStart);
  channel = yield* call(customEvenChannel, 'pad/move');
  yield takeEvery(channel, onPadMove);

  // sync
  yield takeEvery('iso/sync', syncParams);

  // logs
  yield takeEvery('iso/logs', toggleLog);

  // keys
  channel = yield* call(createKeyDownChannel, 'F1');
  yield takeEvery(channel, copyDots);

  channel = yield* call(createKeyDownChannel, 'F10');
  yield takeEvery(channel, togglePerspective);

  channel = yield* call(createKeyDownChannel, 'F11');
  yield takeEvery(channel, toggleWaveform);

  channel = yield* call(createKeyDownChannel, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]); // prettier-ignore
  yield takeEvery(channel, onNumbers);
  12;
  // data ready
  yield takeEvery(predicateAppState('isDataReady', true), onDataIsReady);

  // camera
  yield* fork(listenToCamera);

  // persistence
  yield takeLatest('PATCH_ISOSTATE', saveIsoState);
  yield fork(loadIsoState);
  yield takeLatest(['PATCH_DOT', 'DELETE_DOT'], saveDots);
  yield fork(loadDots);
}
