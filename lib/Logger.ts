import {HKT, Type, Type2, Type3, URIS, URIS2, URIS3} from 'fp-ts/lib/HKT';
import {IO} from 'fp-ts/lib/IO';
import {MonadIO, MonadIO1, MonadIO2, MonadIO3} from 'fp-ts/lib/MonadIO';

export interface Logger {
  (s: unknown): IO<unknown>
}

export function logF<M extends URIS3>(m: MonadIO3<M>): <U, L>(f: Logger) => (s: unknown) => <A>(a: A) => Type3<M, U, L, A>
export function logF<M extends URIS2>(m: MonadIO2<M>): <L>(f: Logger) => (s: unknown) => <A>(a: A) => Type2<M, L, A>
export function logF<M extends URIS>(m: MonadIO1<M>): (f: Logger) => (s: unknown) => <A>(a: A) => Type<M, A>
export function logF<M>(m: MonadIO<M>): (f: Logger) => (s: unknown) => <A>(a: A) => HKT<M, A>
export function logF<M>(m: MonadIO<M>): (f: Logger) => (s: unknown) => <A>(a: A) => HKT<M, A> {
  return f => s => a => m.fromIO(f(s).map(() => a));
}
