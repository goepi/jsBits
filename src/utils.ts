export class RadixError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RadixError";

        // Maintains proper stack trace for where our error was thrown
        // (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RadixError);
        }
    }
}

const isRadix = (n: number): n is Radix => n > 1 && n <= 36;

type Radix = number & { type: 'radix'};

const tc = (n: number) => ~n + 1;

export const twosComplement = (n: number, radix: number) => {
    if (isRadix(radix)) {
        return (tc(n) >>> 0).toString(radix)
    }
    throw new RadixError("Radix must be be between 2 and 36.")
}