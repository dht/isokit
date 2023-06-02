import { call, put, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { createParentBox } from '../isokit.mesh';
import { addSkyPlane } from '../isokit.skybox';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { seedCamera, seedMesh } from './helpers/seed';
import { log } from './helpers/log';

export function* bootstrap(_action: any) {
  log('bootstrap');

  let item;

  const items = yield* select(selectors.raw.$rawItems);
  const groups = yield* select(selectors.raw.$rawGroups);

  for (let group of Object.values(groups)) {
    const { id, params } = group;
    createParentBox(id, params?.position);
  }

  for (item of Object.values(items)) {
    switch (item.itemType) {
      case 'bk':
        addSkyPlane(item.params?.url);
        break;
    }
  }

  for (item of scene.meshes) {
    yield* call(seedMesh, item, groups);
  }

  for (item of scene.cameras) {
    yield* call(seedCamera, item);
  }

  yield put(
    actions.isoState.patch({
      isBoardReady: true,
      cameraId: 'universal-camera',
      meshId: 'box',
    })
  );
}
