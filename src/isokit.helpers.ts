import {
  Animation,
  BezierCurve,
  BezierCurveEase,
  Color3,
  Color4,
  CubicEase,
  EasingFunction,
  Tools,
  Vector3,
} from '@babylonjs/core';
import { scene } from './isokit.globals';

export const color3 = (colorArr: number[]) => {
  return new Color3(colorArr[0], colorArr[1], colorArr[2]);
};

export const color4 = (colorArr: number[]) => {
  return new Color4(colorArr[0], colorArr[1], colorArr[2], colorArr[3]);
};

export const vector3 = (vectorArr: Json): any => {
  return new Vector3(vectorArr.x, vectorArr.y, vectorArr.z);
};

export const vectorRadians = (vectorArr: Json): any => {
  return new Vector3(
    Tools.ToRadians(vectorArr.x),
    Tools.ToRadians(vectorArr.y),
    Tools.ToRadians(vectorArr.z)
  );
};

export function createAnimation(params: Json) {
  const { property, from, to, endFrame = 100, isLinear } = params;

  let ease;

  if (isLinear) {
    ease = new BezierCurveEase(0.5, 0.5, 0.5, 0.5);
  } else {
    ease = new CubicEase();
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  }

  const animation = Animation.CreateAnimation(property, Animation.ANIMATIONTYPE_FLOAT, 10, ease);
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
}

export function simplifyRadians(radians: number) {
  const simplifiedRadians = radians % (2 * Math.PI);

  return simplifiedRadians < 0 ? simplifiedRadians + Tools.ToRadians(360) : simplifiedRadians;
}
