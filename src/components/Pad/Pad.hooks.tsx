import { RefObject, useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';

type Point = {
  x: number;
  y: number;
};

type Delta = {
  dx: number;
  dy: number;
  isRotation: boolean;
};

type UsePadReturn = [
  RefObject<HTMLDivElement>,
  Delta & {
    isDown: boolean;
  }
];

export function usePad(): UsePadReturn {
  const ref = useRef<HTMLDivElement>(null);
  const { isDown, startingPoint } = useMouseDown(ref);
  const { dx, dy, isRotation } = useMouseMove(ref, startingPoint, isDown);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
  }, []);

  return [
    ref,
    {
      isDown,
      dx,
      dy,
      isRotation,
    },
  ];
}

type UseMouseDownReturn = { isDown: boolean; startingPoint: Point };

export function useMouseDown(ref: RefObject<HTMLDivElement>): UseMouseDownReturn {
  const [isDown, setIsDown] = useState(false);
  const [startingPoint, setStartingPoint] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    function onMouseDown(ev: MouseEvent) {
      setStartingPoint({
        x: ev.clientX,
        y: ev.clientY,
      });

      setIsDown(true);
    }

    function onMouseUp(_ev: MouseEvent) {
      setStartingPoint({
        x: 0,
        y: 0,
      });

      setIsDown(false);
    }

    ref.current.addEventListener('mousedown', onMouseDown);
    ref.current.addEventListener('mouseup', onMouseUp);

    return () => {
      ref.current?.removeEventListener('mousedown', onMouseDown);
      ref.current?.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return { isDown, startingPoint };
}

export function useMouseMove(
  ref: RefObject<HTMLDivElement>,
  startingPoint: Point,
  active: boolean
) {
  const [delta, setDelta] = useState<Delta>({ dx: 0, dy: 0, isRotation: false });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    function onMouseMove(ev: MouseEvent) {
      setDelta({
        dx: ev.clientX - startingPoint.x,
        dy: ev.clientY - startingPoint.y,
        isRotation: ev.shiftKey,
      });
    }

    const onMouseMoveThrottled = throttle(onMouseMove, 10);

    if (active) {
      ref.current.addEventListener('mousemove', onMouseMoveThrottled);
    }

    return () => {
      ref.current?.removeEventListener('mousemove', onMouseMoveThrottled);
    };
  }, [active]);

  return delta;
}
