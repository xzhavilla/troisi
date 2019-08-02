import {URIS, URIS2, URIS3} from 'fp-ts/lib/HKT';
import {Monad, Monad1, Monad2, Monad3} from 'fp-ts/lib/Monad';
import {HttpClient, HttpClient1, HttpClient2C, HttpClient3C, HttpRequest} from './HttpClient';

const voidRequest = <M>(m: Monad<M>): HttpRequest<M> => () => m.of(undefined);

export function VoidHttpClient<M extends URIS3, U, L, T extends Monad3<M> = Monad3<M>>(m: Monad3<M>): HttpClient3C<M, U, L> & T
export function VoidHttpClient<M extends URIS2, L, T extends Monad2<M> = Monad2<M>>(m: Monad2<M>): HttpClient2C<M, L> & T
export function VoidHttpClient<M extends URIS, T extends Monad1<M> = Monad1<M>>(m: Monad1<M>): HttpClient1<M> & T
export function VoidHttpClient<M, T extends Monad<M> = Monad<M>>(m: Monad<M>): HttpClient<M> & T
export function VoidHttpClient<M>(m: Monad<M>): HttpClient<M> & typeof m {
  return {
    ...m,
    delete: voidRequest(m),
    get: voidRequest(m),
    head: voidRequest(m),
    patch: voidRequest(m),
    post: voidRequest(m),
    put: voidRequest(m),
  };
}
