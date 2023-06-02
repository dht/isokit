import { guid4 } from 'shared-base';
import { IDot } from '../../store/iso.types';
import { put } from 'saga-ts';
import { actions } from '../../store/iso.actions';

export function* createDot(values: Partial<IDot>, focus?: boolean) {
  const dot: IDot = {
    id: guid4(),
    ...values,
  } as IDot;

  yield put(actions.dots.add(dot));

  if (focus) {
    yield put(
      actions.isoState.patch({
        dotId: dot.id,
      })
    );
  }
}
