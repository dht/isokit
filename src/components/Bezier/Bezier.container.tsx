import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { useSpace } from '../../hooks/useSpace';
import { actions } from '../../store/iso.actions';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { Bezier } from './Bezier';

export type BezierContainerProps = {};

export function BezierContainer(props: BezierContainerProps) {
  const dispatch = useDispatch();
  const value = useSelector(selectors.components.$dotCurrentBezier);

  const callbacks = useMemo(
    () => ({
      onChange: (change: Json) => {
        dispatch({
          type: 'iso/easing',
          value: 'custom',
          controlPoints: change,
        });
      },
    }),
    []
  );

  return <Bezier value={value} callbacks={callbacks} />;
}

export default BezierContainer;
