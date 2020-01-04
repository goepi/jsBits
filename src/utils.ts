// https://stackoverflow.com/questions/16155592/negative-numbers-to-binary-string-in-javascript

export class RadixError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RadixError';

    // Maintains proper stack trace for where our error was thrown
    // (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RadixError);
    }
  }
}

const isRadix = (n: number): n is Radix => n > 1 && n <= 36;

type Radix = number & { type: 'radix' };

// flip the bits and add one
const tc = (n: number) => ~n + 1;

export const twosComplement = (n: number, radix: number) => {
  if (isRadix(radix)) {
    return (tc(n) >>> 0).toString(radix);
  }
  throw new RadixError('Radix must be be between 2 and 36.');
};

export const toRepresentation = (n: number, radix: number) => {
  if (isRadix(radix)) {
    return (n >>> 0).toString(radix);
  }
  throw new RadixError('Radix must be be between 2 and 36.');
};

export const toHex = (n: number) => {
  let str = '';
  let result = n;
  do {
    result = Math.floor(result / 16);
    let current = result % 16;
    str += current < 10 ? current : decToHex[current];
  } while (result);
  return str;
};

const decToHex = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};
