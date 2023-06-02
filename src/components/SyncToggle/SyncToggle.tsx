import React from 'react';
import { Wrapper } from './SyncToggle.style';
import classnames from 'classnames';

export type SyncToggleProps = {
  isSyncOn: boolean;
  onToggle: () => void;
};

export function SyncToggle(props: SyncToggleProps) {
  const { isSyncOn } = props;

  const className = classnames('SyncToggle-wrapper', {
    on: isSyncOn,
  });

  return (
    <Wrapper
      className={className}
      data-testid='SyncToggle-wrapper'
      onClick={props.onToggle}
    ></Wrapper>
  );
}

export default SyncToggle;
