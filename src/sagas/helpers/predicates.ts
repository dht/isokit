export const predicateIsoState =
  (key: string, nonEmpty: boolean = false) =>
  (action: any) => {
    return (
      action.type === 'PATCH_ISOSTATE' &&
      key in action.payload &&
      (!nonEmpty || action.payload[key])
    );
  };

export const predicateIsoStateArr = (keys: string[]) => (action: any) => {
  return action.type === 'PATCH_ISOSTATE' && keys.some((key) => key in action.payload);
};

export const predicatePlay = (key: string) => (action: any) => {
  return action.type === 'PATCH_PLAYSTATE' && key in action.payload;
};

export const predicateAppState =
  (key: string, nonEmpty: boolean = false) =>
  (action: any) => {
    return (
      action.type === 'PATCH_APPSTATE' &&
      key in action.payload &&
      (!nonEmpty || action.payload[key])
    );
  };

export const predicateActionType = (actionType: string, filterKeys?: string[]) => (action: any) => {
  const okType = action.type === actionType;

  if (!filterKeys || !okType) {
    return okType;
  }

  const okKeys = filterKeys.some((key) => key in action.payload);
  return okType && okKeys;
};
