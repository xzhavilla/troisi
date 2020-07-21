import {identity} from 'fp-ts/lib/function';
import * as t from 'io-ts';

const is = (u: unknown): u is Buffer => u instanceof Buffer;

export const BufferC = new t.Type<Buffer>(
  'Buffer',
  is,
  (u, c) => is(u) ? t.success(u) : t.failure(u, c),
  identity
);
