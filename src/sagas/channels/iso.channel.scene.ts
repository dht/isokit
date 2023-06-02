import { throttle } from 'lodash';
import { eventChannel } from 'saga-ts';

export const createSceneChannel = (scene: any, throttleValue: number = 100) => {
  return eventChannel((emit) => {
    const onRender = (camera: any) => {
      emit(camera);
    };

    const callback = throttle(onRender, throttleValue);

    scene.onAfterCameraRenderObservable.add(callback);

    return () => {
      scene.onAfterCameraRenderObservable.remove(callback);
    };
  });
};
