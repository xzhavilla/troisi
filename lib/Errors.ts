import {ArrayIterator} from './ArrayIterator';

export interface Errors {
  readonly errors: Array<Error>

  map<A>(f: (error: Error) => A): Array<A>

  [Symbol.iterator](): Iterator<Error>
}

export const Errors = (...errors: Array<Error | string | undefined>): Errors => ({
  errors: errors.map(error => error instanceof Error ? error : Error(error)),
  map(f) {
    return this.errors.map(f);
  },
  [Symbol.iterator]() {
    return new ArrayIterator(this.errors);
  },
});
