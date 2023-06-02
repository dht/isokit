import { call, delay, put, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { createParentBox } from '../isokit.mesh';
import { addSkyPlane } from '../isokit.skybox';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { seedCamera, seedMesh } from './helpers/seed';
import { log } from './helpers/log';

export function* bootstrap() {
  log('bootstrap');

  let item, count;

  const items = yield* select(selectors.raw.$rawSceneItems);
  const groups = yield* select(selectors.raw.$rawGroups);

  log('seeding groups', { count: Object.keys(groups).length });

  for (let group of Object.values(groups)) {
    const { id, params } = group;
    createParentBox(id, params?.position);
  }

  log('seeding skyPlane');
  addSkyPlane('http://localhost:3001/scenes/s2.png');

  log('seeding meshes', { count: Object.keys(scene.meshes).length });

  for (item of scene.meshes) {
    yield* call(seedMesh, item, groups);
  }

  log('seeding cameras', { count: Object.keys(scene.cameras).length });

  for (item of scene.cameras) {
    yield* call(seedCamera, item);
  }

  yield delay(0);
  log('board ready');

  yield put(
    actions.isoState.patch({
      isBoardReady: true,
      cameraId: 'universal',
    })
  );
}
