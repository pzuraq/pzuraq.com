import { dev } from '$app/environment';

export function expect<T>(value: T | undefined | null, message: string): T {
  if (dev && (value === undefined || value === null)) {
    throw new Error(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return value!;
}

export function assert(predicate: boolean, message: string): asserts predicate {
  if (dev && !predicate) {
    throw new Error(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function unreachable(_val: never): never {
  throw new Error('Reached an unreachable value, you probably have an unexhausted/unhandled enum');
}
