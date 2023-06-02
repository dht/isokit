import React, { useState } from 'react';
import { Field, Key, Value, Wrapper } from './CameraInfo.style';
import { useCustomEvent } from '../../hooks/useCustomEvent';

export type CameraInfoProps = {};

export function CameraInfo(_props: CameraInfoProps) {
  const [state, setState] = useState<Json>({
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0,
  });

  useCustomEvent(
    'iso/pos/camera',
    (data: any) => {
      if (data.isArc) {
        delete data['rx'];
        delete data['ry'];
        delete data['rz'];
      } else {
        delete data['radius'];
        delete data['alpha'];
        delete data['beta'];
      }

      delete data['isArc'];

      setState(data);
    },
    []
  );

  function renderField(key: string) {
    const value = state[key];

    return (
      <Field key={key} className='number'>
        <Key>{key.substring(0, 2)}: </Key>
        <Value>{['x', 'y', 'z'].includes(key) ? value : Math.round(value)}</Value>
      </Field>
    );
  }

  function renderFields() {
    return Object.keys(state).map((key: string) => renderField(key));
  }

  return (
    <Wrapper className='CameraInfo-wrapper' data-testid='CameraInfo-wrapper'>
      {renderFields()}
    </Wrapper>
  );
}

export default CameraInfo;
