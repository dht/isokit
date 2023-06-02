import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { useList } from 'react-use';
import { addListener, sortBy } from 'shared-base';
import { Content, Log, Wrapper } from './LogPanel.style';

export type LogPanelProps = {};

type ILog = {
  id: string;
  message: string;
  timestamp: number;
  data?: Json;
};

export function LogPanel(_props: LogPanelProps) {
  const [logs, { push }] = useList<ILog>([]);

  useEffect(() => {
    const unlisten = addListener('iso/log', (log: any) => {
      push(log);
    });

    return () => unlisten();
  }, []);

  function onStart(ev: any) {
    ev.stopPropagation();
  }

  function renderLog(log: ILog) {
    let { message, timestamp, data = {} } = log;

    if ('count' in data) {
      message = `${message} (${data.count})`;
    }

    return (
      <Log key={log.id} className='log'>
        {formatTimestamp(timestamp)}: {message}
      </Log>
    );
  }

  function renderLogs() {
    return logs //
      .sort(sortBy('timestamp', 'desc'))
      .map((log: ILog) => renderLog(log));
  }

  return (
    <Draggable onStart={onStart}>
      <Wrapper className='LogPanel-wrapper' data-testid='LogPanel-wrapper'>
        <Content>{renderLogs()}</Content>
      </Wrapper>
    </Draggable>
  );
}

const start = Date.now();

export const formatTimestamp = (t: number) => {
  const delta = t - start;

  const seconds = Math.floor(delta / 1000);
  const millis = delta % 1000;

  return `${lz(seconds)}.${lz(millis, 3)}`;
};

const lz = (n: number, len: number = 2) => n.toString().padStart(len, '0');

export default LogPanel;
