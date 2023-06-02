import { eventChannel } from 'saga-ts';

export const createMouseDownChannel = () => {
  return eventChannel((emit) => {
    const onMouseDown = (event: any) => {
      emit(event);
    };

    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  });
};
