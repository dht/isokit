import { eventChannel } from 'saga-ts';

export const createKeyDownChannel = (key: string | string[]) => {
  const keys = Array.isArray(key) ? key : [key];

  return eventChannel((emit) => {
    const onKeyDown = (event: any) => {
      if (keys.includes(event.key)) {
        emit(event);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });
};
