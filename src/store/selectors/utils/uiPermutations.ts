const options: any = {
  layer: ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'],
  control: ['C1', 'C2', 'C3', 'C4'],
  object: ['OM', 'OC'],
  dot: ['DN', 'DO'],
  playback: ['PI', 'PP'],
  region: ['R0', 'RS'],
  sync: ['SN', 'SY'],
};

export const calculatePermutationIndex = (parts: Record<string, string>) => {
  let currentIndex = 0,
    multiplier = 1;

  for (const option of Object.keys(options)) {
    const arr = options[option];
    const len = arr.length;
    const index = arr.indexOf(parts[option]);
    currentIndex += index * multiplier;
    multiplier *= len;
  }

  return currentIndex;
};
