import { useDispatch } from '@gdi/store-base';
import { useMemo } from 'react';
import { actions } from '../store/iso.actions';

export function useToolbar(buttons: Json[]) {
  const dispatch = useDispatch();

  const callbacks = useMemo(
    () => ({
      onToggle: (buttonId: string, isOn: boolean) => {
        const button = buttons.find((b) => b.id === buttonId);

        if (!button) {
          return;
        }

        const { actionType, actionParams } = button;

        if (actionType) {
          dispatch({
            type: actionType,
            ...actionParams,
          });
        } else {
          dispatch(
            actions.isoState.patch({
              [buttonId]: isOn,
            })
          );
        }
      },
    }),
    []
  );

  return callbacks;
}
