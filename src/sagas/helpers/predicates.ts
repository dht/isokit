export const predicateIsoState =
  (key: string, nonEmpty: boolean = false) =>
  (action: any) => {
    return (
      action.type === 'PATCH_ISOSTATE' &&
      key in action.payload &&
      (!nonEmpty || action.payload[key])
    );
  };

export const predicatePlay = (key: string) => (action: any) => {
  return action.type === 'PATCH_PLAY' && key in action.payload;
};
