import { put } from 'saga-ts';
import { actions } from '../../store/iso.actions';
import * as v from '../utils/vectors';
import { ArcRotateCamera, FreeCamera } from '@babylonjs/core';
import { IDot, IGroups, ISceneItem } from '../../store/iso.types';
import { setParentMesh } from '../../isokit.mesh';

let dotIndex = 10;

export function* seedMesh(item: any, groups: any) {
  const { name: id } = item;

  if (['__root__', 'BackgroundHelper'].includes(id)) {
    return;
  }

  const newItem: ISceneItem = {
    id,
    itemType: 'mesh',
  };

  const group = findGroup(groups, id);

  if (group) {
    newItem.groupId = group.id;
    setParentMesh(id, group.id);
  }

  yield put(actions.sceneItems.set(id, newItem));

  if (group) {
    return;
  }

  const dotId = 'a' + String(dotIndex++);

  yield put(
    actions.dots.set(dotId, {
      id: dotId,
      itemId: id,
      dotType: 'mesh',
      params: v.toFlatPos({
        position: item.position,
        rotation: item.rotation,
      }),
      timestamp: 10,
      isGenerated: true,
    })
  );
}

export function* seedCamera(item: any) {
  const { name: id } = item;

  yield put(
    actions.sceneItems.set(id, {
      id: item.name,
      itemType: 'camera',
      isCamera: true,
    })
  );

  const dotId = 'a' + String(dotIndex++);

  const dot: IDot = {
    id: dotId,
    itemId: id,
    timestamp: 10,
    isGenerated: true,
    layerId: 'dots',
    dotType: 'camera-arc',
  };

  if (item instanceof FreeCamera) {
    dot.dotType = 'camera-universal';
    dot.params = v.toFlatPos(
      {
        position: item.position,
        rotation: item.rotation,
      },
      2
    );
  } else if (item instanceof ArcRotateCamera) {
    dot.dotType = 'camera-arc';
    dot.params = v.toFlatPos(
      {
        alpha: item.alpha,
        beta: item.beta,
        radius: item.radius,
        position: item.target,
      },
      2
    );
  }

  yield put(actions.dots.set(dotId, dot));
}

export const findGroup = (groups: IGroups, name: string) => {
  return Object.values(groups ?? {}).find((group) => {
    return group.itemIds.includes(name);
  });
};
