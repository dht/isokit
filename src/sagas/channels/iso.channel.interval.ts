import { eventChannel } from 'saga-ts';

export const createIntervalChannel = (interval: number) => {
  return eventChannel((emit) => {
    const id = setInterval(() => {
      emit(Date.now());
    }, interval);

    return () => {
      clearInterval(id);
    };
  });
};
