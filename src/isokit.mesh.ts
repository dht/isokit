import {
  Animation,
  ArcRotateCamera,
  BezierCurveEase,
  Color3,
  FreeCamera,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import { scene } from './isokit.globals';
import { vector3, vectorRadians } from './isokit.helpers';
import { animationProperties } from './isokit.mesh.data';
import { IPosFlat, Vector } from './store/iso.types';

export const createParentBox = (id: string, position: Vector) => {
  const parentBox = MeshBuilder.CreateBox(id, { size: 1 }, scene);
  parentBox.position = vector3(position);
  const material = new StandardMaterial(id, scene);
  // material.emissiveColor = new Color3(1, 1, 1);
  // parentBox.material = material;
  parentBox.isVisible = false;
  return parentBox;
};

export const setParentMesh = (meshId: string, parentId: string) => {
  const mesh = scene.getMeshByName(meshId);
  const parentBox = scene.getMeshByName(parentId);

  if (!mesh || !parentBox) {
    return;
  }

  mesh.parent = parentBox;
};

export const moveMesh = (meshIds: string | string[], params: Json) => {
  let { position, positionDelta, rotation, isLinear } = params;

  const ids = Array.isArray(meshIds) ? meshIds : [meshIds];

  ids.forEach((meshId) => {
    const mesh = scene.getMeshByName(meshId);

    if (!mesh) {
      return;
    }

    const toPosition = new Vector3(mesh.position.x, mesh.position.y, mesh.position.z);

    if (positionDelta) {
      toPosition.x += positionDelta.x ?? 0;
      toPosition.y += positionDelta.y ?? 0;
      toPosition.z += positionDelta.z ?? 0;
    } else if (position) {
      toPosition.x = position.x;
      toPosition.y = position.y;
      toPosition.z = position.z;
    }

    mesh.position = toPosition;

    if (rotation) {
      mesh.rotation = vectorRadians(rotation);
    }
  });
};

export const createTorus = (scene: Scene) => {
  const torus = MeshBuilder.CreateTorus(
    'torus',
    {
      diameter: 0.7,
      thickness: 0.2,
    },
    scene
  );

  torus.position = new Vector3(0, -10, 0);
  torus.rotation = new Vector3(-0.2, 0, 0);
  torus.scaling = new Vector3(1, 1, 1);

  const material = new StandardMaterial('torusMaterial', scene);
  material.diffuseColor = new Color3(0.0, 0.0, 0.0);
  material.specularColor = new Color3(0, 0, 0);
  material.emissiveColor = new Color3(0, 0.5, 0.5);
  material.alpha = 0.2;
  torus.material = material;

  return torus;
};

export const moveTorus = (scene: Scene, vector: Json) => {
  const torus = scene.getMeshByName('torus');

  if (!torus) {
    return;
  }
  torus.position = new Vector3(vector.x + 0.2, 0.1, vector.z + 0.4);
};

type FrameOptions = {
  seconds: number;
  framesPerSecond: number;
  loop: boolean;
};

const createFrame = (
  ease: any,
  property: string,
  from: number,
  to: number,
  options: Partial<FrameOptions> = {}
) => {
  const { seconds = 1, framesPerSecond = 30, loop = false } = options;
  const endFrame = framesPerSecond * seconds;

  const animation = Animation.CreateAnimation(
    property,
    Animation.ANIMATIONTYPE_FLOAT,
    framesPerSecond,
    ease
  );

  if (loop) {
    animation.loopMode = Animation.ANIMATIONLOOPMODE_CYCLE;
  }

  animation.setKeys([
    {
      frame: 0,
      value: from,
    },
    {
      frame: endFrame,
      value: to,
    },
  ]);

  return animation;
};

export type ItemType = 'freeCamera' | 'arcCamera' | 'mesh' | 'unknown';

export const getItemType = (itemId: string, isCamera: boolean) => {
  if (!isCamera) {
    const mesh = scene.getMeshByName(itemId);
    return mesh ? 'mesh' : 'unknown';
  }

  const camera = scene.getCameraByName(itemId);

  if (!camera) {
    return 'unknown';
  }

  if (camera instanceof FreeCamera) {
    return 'freeCamera';
  }

  if (camera instanceof ArcRotateCamera) {
    return 'arcCamera';
  }

  return 'unknown';
};

export function animateItem(
  delta: number,
  itemId: string,
  params: Partial<IPosFlat>,
  nextParams: Partial<IPosFlat>,
  isCamera: boolean = false,
  beginFrom: number = 0
) {
  const itemType = getItemType(itemId, isCamera);

  if (itemType === 'unknown') {
    return;
  }

  const item = itemType === 'mesh' ? scene.getMeshByName(itemId) : scene.getCameraByName(itemId);

  if (!item) {
    return;
  }

  const { b1, b2, b3, b4, l } = params;
  const seconds = delta / 1000;
  const ease = new BezierCurveEase(b1, b2, b3, b4);
  const loop = l === 1;

  const frameOptions: Partial<FrameOptions> = {
    seconds,
    loop,
  };

  const frames: Animation[] = [];

  for (let p of animationProperties) {
    let from = params[p.fieldKey as keyof IPosFlat];
    let to = nextParams[p.fieldKey as keyof IPosFlat];

    if (from === undefined || to === undefined) {
      continue;
    }

    if (!p.appliesTo.includes(itemType)) {
      continue;
    }

    if (p.isDegrees) {
      from = degreesToRadians(from as number);
      to = degreesToRadians(to as number);
    }

    const frame = createFrame(ease, p.property, from as number, to as number, frameOptions);
    frames.push(frame);
  }

  item.animations = frames;
  const endFrame = seconds * 30;
  scene.beginAnimation(item, beginFrom, endFrame, params.l === 1, 1);
}

// export function animateCamera(
//   delta: number,
//   meshId: string,
//   params: Partial<IPosFlat>,
//   nextParams: Partial<IPosFlat>
// ) {
//   const camera = scene.getCameraByName(meshId);

//   if (!camera) {
//     return;
//   }

//   const { b1, b2, b3, b4, l } = params;
//   const seconds = delta / 1000;
//   const ease = new BezierCurveEase(b1, b2, b3, b4);
//   const loop = l === 1;

//   const frameOptions: Partial<FrameOptions> = {
//     seconds,
//     loop,
//   };

//   if (camera instanceof ArcRotateCamera) {
//     const arcAnimation = [
//       createFrame( ease, 'alpha', degreesToRadians(params.alpha ?? 0), degreesToRadians(nextParams.alpha ?? 0), frameOptions), // prettier-ignore
//       createFrame( ease, 'beta', degreesToRadians(params.beta ?? 0), degreesToRadians(nextParams.beta ?? 0), frameOptions), // prettier-ignore
//       createFrame( ease, 'radius', params.radius ?? 0, nextParams.radius ?? 0, frameOptions), // prettier-ignore
//     ];

//     camera.animations = [...arcAnimation];
//   } else {
//     const rotationAnimation = [
//       createFrame( ease, 'rotation.x', degreesToRadians(params.rx ?? 0), degreesToRadians(nextParams.rx ?? 0), frameOptions), // prettier-ignore
//       createFrame( ease, 'rotation.y', degreesToRadians(params.ry ?? 0), degreesToRadians(nextParams.ry ?? 0), frameOptions), // prettier-ignore
//       createFrame( ease, 'rotation.z', degreesToRadians(params.rz ?? 0), degreesToRadians(nextParams.rz ?? 0), frameOptions), // prettier-ignore
//     ];

//     const positionAnimation = [
//       createFrame(ease, 'position.x', params.x ?? 0, nextParams.x ?? 0, frameOptions),
//       createFrame(ease, 'position.y', params.y ?? 0, nextParams.y ?? 0, frameOptions),
//       createFrame(ease, 'position.z', params.z ?? 0, nextParams.z ?? 0, frameOptions),
//     ];

//     camera.animations = [...rotationAnimation, ...positionAnimation];
//   }

//   const endFrame = seconds * 30;

//   scene.beginAnimation(camera, 0, endFrame, params.l === 1, 1);
// }

export const listMeshes = () => {
  scene.meshes.forEach((mesh) => {
    console.log(mesh.name);
  });
};

export const showMesh = (id: string, show: boolean) => {
  const item = scene.getMeshByName(id);

  if (!item) {
    return;
  }

  item.setEnabled(show);
};

export const changePosition = (id: string, json: Json, isCamera?: boolean) => {
  const mesh = isCamera ? scene.getCameraByName(id) : scene.getMeshByName(id);

  if (!mesh) {
    return;
  }

  Object.keys(json).forEach((key) => {
    const value = parseFloat(json[key]);

    if (!mesh) {
      return;
    }

    if (isCamera && mesh instanceof ArcRotateCamera) {
      switch (key) {
        case 'x':
          mesh.target.x = value;
          break;
        case 'y':
          mesh.target.y = value;
          break;
        case 'z':
          mesh.target.z = value;
          break;
      }
    }

    switch (key) {
      case 'x':
        mesh.position.x = value;
        break;
      case 'y':
        mesh.position.y = value;
        break;
      case 'z':
        mesh.position.z = value;
        break;
    }
  });
};

export const changeRotation = (id: string, json: Json, isCamera?: boolean) => {
  const mesh = isCamera ? scene.getCameraByName(id) : scene.getMeshByName(id);

  if (!mesh) {
    return;
  }

  Object.keys(json).forEach((key) => {
    let value = parseFloat(json[key]);

    if (key !== 'radius') {
      value = degreesToRadians(value);
    }

    if (mesh instanceof ArcRotateCamera) {
      switch (key) {
        case 'alpha':
          mesh.alpha = value;
          break;
        case 'beta':
          mesh.beta = value;
          break;
        case 'radius':
          mesh.radius = value;
          break;
      }
    } else if (mesh instanceof FreeCamera || mesh instanceof Mesh) {
      switch (key) {
        case 'rx':
          mesh.rotation.x = value;
          break;
        case 'ry':
          mesh.rotation.y = value;
          break;
        case 'rz':
          mesh.rotation.z = value;
          break;
      }
    }
  });
};

export const changeFlatPos = (id: string, flatPos?: IPosFlat, isCamera?: boolean) => {
  if (!flatPos) {
    return;
  }

  changePosition(id, flatPos, isCamera);
  changeRotation(id, flatPos, isCamera);
};

export const degreesToRadians = (radians: number) => {
  return (radians * Math.PI) / 180;
};
