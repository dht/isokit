import { useEffect } from 'react';
import { addListener } from 'shared-base';

export function useCustomEvent(eventId: string, callback: any, depArray: any[] = []) {
  useEffect(() => {
    const unlisten = addListener(eventId, callback);

    return () => {
      unlisten();
    };
  }, [...depArray]);
}
