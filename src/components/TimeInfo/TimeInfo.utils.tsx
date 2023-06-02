type Elapsed = {
  minutes: string;
  seconds: string;
  millis: string;
};

const lz = (num: number, digits: number = 2) => {
  let s = num.toString();

  while (s.length < digits) {
    s = '0' + s;
  }

  return s;
};

export const toElapsed = (currentSeconds: number): Elapsed => {
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = Math.floor(currentSeconds - minutes * 60);
  const milliseconds = Math.floor((currentSeconds - minutes * 60 - seconds) * 1000);

  return {
    minutes: lz(minutes),
    seconds: lz(seconds, 2),
    millis: lz(milliseconds, 3),
  };
};
