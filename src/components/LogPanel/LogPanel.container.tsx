import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { useList } from 'react-use';
import { addListener, sortBy } from 'shared-base';
import { Content, Log, Wrapper } from './LogPanel.style';
import LogPanel from './LogPanel';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { useSelector } from '@gdi/store-base';

export type LogPanelContainerProps = {};

export function LogPanelContainer(_props: LogPanelContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const { showLog } = isoState;

  if (!showLog) {
    return null;
  }

  return <LogPanel />;
}
