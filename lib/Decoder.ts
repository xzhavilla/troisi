import {HKT, Type2, Type3, URIS2, URIS3} from 'fp-ts/lib/HKT';
import {MonadThrow, MonadThrow2, MonadThrow3} from 'fp-ts/lib/MonadThrow';
import * as t from 'io-ts';
import {Either_} from './Either';

export function decodeF<M extends URIS3>(m: MonadThrow3<M>): <U, L>() => <A, I = unknown>(codec: t.Type<A, any, I>) => (i: I) => Type3<M, U, L, A>
export function decodeF<M extends URIS2>(m: MonadThrow2<M>): <L>() => <A, I = unknown>(codec: t.Type<A, any, I>) => (i: I) => Type2<M, L, A>
export function decodeF<M>(m: MonadThrow<M>): () => <A, I = unknown>(codec: t.Type<A, any, I>) => (i: I) => HKT<M, A>
export function decodeF<M>(m: MonadThrow<M>): () => <A, I = unknown>(codec: t.Type<A, any, I>) => (i: I) => HKT<M, A> {
  return () => codec => i => {
    const validation = codec.decode(i);
    const either = Either_.fromValidation(validation);

    return m.fromEither(either);
  };
}
