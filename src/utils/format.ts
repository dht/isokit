export const timestamp = (num: number) => {
  // 19483.294834943 to 19.48s

  const seconds = Math.floor(num / 1000);
  const milliseconds = Math.round((num - seconds) % 1000);

  return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
};

export const format = {
  timestamp,
};
