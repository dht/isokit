import { call, put, select } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { controlCamera } from './iso.saga.cameras';
import { controlDot } from './iso.saga.dots';
import { controlMesh } from './iso.saga.meshes';

export function* controls(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId, cameraId, meshId, layerId } = isoState;

  if (layerId === 'dots') {
    if (dotId) {
      yield call(controlDot, action);
      return;
    }

    if (cameraId) {
      yield call(controlCamera, action);
      return;
    }

    if (meshId) {
      yield call(controlMesh, action);
      return;
    }
  }

  if (!dotId) {
    return;
  }

  switch (layerId) {
    case 'viz':
      yield put(actions.dots.patch(dotId, action.data));
      break;
    case 'sky':
      yield put(actions.dots.patch(dotId, action.data));
      break;
    case 'sfx':
      yield put(actions.dots.patch(dotId, action.data));
      break;
    case 'vfx':
      yield put(actions.dots.patch(dotId, action.data));
      break;
    case 'hud':
      yield put(actions.dots.patch(dotId, action.data));
      break;
  }
}

export function* changeControlsDefinitionEmpty(message: string) {
  yield put(
    actions.control.patch({
      dot: undefined,
      emptyMessage: message,
      isDot: false,
      isEmpty: true,
      formType: 'mesh',
      isSetPiece: false,
      pos: {},
    })
  );
}

export function* changeControlsDefinitionDot(action: any) {
  const dot = yield* select(selectors.playback.$dotCurrent);

  if (!dot) {
    yield call(changeControlsDefinitionEmpty, 'No dot selected');
    return;
  }

  yield put(
    actions.control.patch({
      dot,
      emptyMessage: '',
      isDot: true,
      isEmpty: false,
      formType: dot.dotType,
      isSetPiece: dot.isSetPiece,
      pos: dot.params,
    })
  );
}

export function* changeControlsDefinitionMesh(action: any) {
  const allPos = yield* select(selectors.pos.$allPos, {});

  if (!allPos.meshSelected) {
    yield call(changeControlsDefinitionEmpty, 'No mesh selected');
    return;
  }

  yield put(
    actions.control.patch({
      dot: undefined,
      emptyMessage: '',
      isDot: false,
      isEmpty: false,
      formType: 'mesh',
      isSetPiece: false,
      pos: allPos.meshSelected,
    })
  );
}

export function* changeControlsDefinitionCamera(action: any) {
  const allPos = yield* select(selectors.pos.$allPos, {});

  if (!allPos.meshSelected) {
    yield call(changeControlsDefinitionEmpty, 'No camera selected');
    return;
  }

  yield put(
    actions.control.patch({
      dot: undefined,
      emptyMessage: '',
      isDot: false,
      isEmpty: false,
      formType: 'mesh',
      isSetPiece: false,
      pos: allPos.cameraSelected,
    })
  );
}

export function* changeControlsDefinitionSetPiece(action: any) {
  const dot = yield* select(selectors.dots.$setPieceDot);

  if (!dot) {
    yield call(changeControlsDefinitionEmpty, 'No set piece dot');
    return;
  }

  yield put(
    actions.control.patch({
      dot: undefined,
      emptyMessage: '',
      isDot: true,
      isEmpty: false,
      formType: dot.dotType,
      isSetPiece: true,
      pos: dot.params,
    })
  );
}

const map: any = {
  dot: changeControlsDefinitionDot,
  mesh: changeControlsDefinitionMesh,
  camera: changeControlsDefinitionCamera,
  setPiece: changeControlsDefinitionSetPiece,
};

export function* changeControlsDefinition(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { paramsId } = isoState;

  const saga = map[paramsId];

  if (!saga) {
    return;
  }

  yield call(saga, action);
}

export function* changeParamId(action: any) {
  const { flavour } = action;

  yield put(actions.isoState.patch({ paramsId: flavour }));
  yield call(changeControlsDefinition, action);
}
