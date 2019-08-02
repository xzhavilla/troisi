import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';

export const binary = () => integer(2) as 0 | 1;
export const integer = (max = Math.pow(2, 32)) => Math.floor(Math.random() * max);
export const string = (): NonEmptyString => Math.random().toString(36).slice(2) as any;
export const date = () => new Date(Math.random() * Date.now());
export const range = (n = integer()) => Array.from(Array(n)).map((_, i) => i);
export const random = <A>(...as: Array<A>): A => as[integer(as.length)];
export const repeat = (f: Function, n?: number) => range(n).map(a => f(a));
export const generator = function* <A>(f: () => A, ...as: Array<A>) {
  let i = 0;
  while (true) {
    yield i < as.length
      ? as[i++]
      : f();
  }
};
