import { useDispatch } from '@gdi/store-base';
import { useMemo } from 'react';
import { actions } from '../store/iso.actions';

export function useToolbar() {
  const dispatch = useDispatch();

  const callbacks = useMemo(
    () => ({
      onToggle: (button: Json, isOn?: boolean) => {
        const { actionType, actionParams } = button;

        if (actionType) {
          dispatch({
            type: actionType,
            ...actionParams,
          });
        } else {
          dispatch(
            actions.isoState.patch({
              [button.id]: isOn,
            })
          );
        }
      },
    }),
    []
  );

  return callbacks;
}
