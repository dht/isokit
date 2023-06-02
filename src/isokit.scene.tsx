import { Engine, Scene, VideoRecorder } from '@babylonjs/core';
import '@babylonjs/inspector';
import { useCustomEvent } from '@gdi/hooks';
import { useRef, useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import styled from 'styled-components';
import SceneBuilder from './components/SceneBuilder/SceneBuilder.container';
import { setEngine, setScene } from './isokit.globals';

export const BabylonScene = (props: any) => {
  const canvas = useRef(null);
  const engine = useRef<any>();
  const scene = useRef<any>();
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  useMount(() => {
    const el = canvas.current as any;
    const { width, height } = el.parentNode.getBoundingClientRect();
    setWidth(width);
    setHeight(height);
  });

  useCustomEvent(
    'load_babylonjs_scene',
    (callback: any) => {
      if (!canvas.current) {
        return;
      }

      if (engine.current) {
        engine.current.dispose();
      }

      engine.current = new Engine(canvas.current);
      setEngine(engine.current);

      // if (VideoRecorder.IsSupported(engine.current)) {
      //   var recorder = new VideoRecorder(engine.current);
      //   recorder.startRecording('hovercraft.webm', 60000);
      // }

      if (scene.current) {
        scene.current.dispose();
      }

      scene.current = new Scene(engine.current, {});

      setScene(scene.current);

      if (scene.current.isReady()) {
        callback(scene.current);
      } else {
        scene.current.onReadyObservable.addOnce(() => {
          callback(scene.current);
        });
      }

      return () => {
        scene.current.getEngine().dispose();
      };
    },
    []
  );

  useUnmount(() => {
    if (scene.current) {
      scene.current.getEngine().dispose();
    }
  });

  return (
    <>
      <Canvas ref={canvas} width={width} height={height} />
      <SceneBuilder />
    </>
  );
};

export const Canvas = styled.canvas`
  outline: none;
`;
