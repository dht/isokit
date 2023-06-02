import { guid4, invokeEvent } from 'shared-base';

export function log(message: string, data: Json = {}, force?: boolean) {
  invokeEvent('iso/log', {
    id: guid4(),
    timestamp: Date.now(),
    message,
    data,
  });
}
