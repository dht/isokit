import { call, delay, put, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { createParentBox } from '../isokit.mesh';
import { addSkyPlane } from '../isokit.skybox';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { l } from '../utils/logs';
import { seedCamera, seedMesh } from './helpers/seed';
import { focusWaveForm } from './iso.saga.shots';

export function* bootstrap() {
  l({ message: 'seeding started', verb: 'scene' });

  let item, count;

  const items = yield* select(selectors.raw.$rawSceneItems);

  const groups = yield* select(selectors.raw.$rawGroups);

  l({ message: 'seeding groups', verb: 'scene', data: { count: Object.keys(groups).length } });

  for (let group of Object.values(groups)) {
    const { id, params } = group;
    createParentBox(id, params?.position);
  }

  l({ message: 'seeding skyPlane', verb: 'scene' });
  addSkyPlane('/scenes/s2.png');

  l({
    message: 'seeding meshes',
    verb: 'scene',
    data: { count: Object.keys(scene.meshes).length },
  });

  for (item of scene.meshes) {
    yield* call(seedMesh, item, groups);
  }

  l({
    message: 'seeding cameras',
    verb: 'scene',
    data: { count: Object.keys(scene.cameras).length },
  });

  for (item of scene.cameras) {
    yield* call(seedCamera, item);
  }

  yield delay(0);
  l({ message: 'board ready', verb: 'scene' });

  yield put(
    actions.isoState.patch({
      isBoardReady: true,
      cameraId: 'universal',
    })
  );

  yield put(
    actions.control.patch({
      formType: 'camera-universal',
    })
  );

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { focusedShotId } = isoState;
  yield call(focusWaveForm, focusedShotId);
}
