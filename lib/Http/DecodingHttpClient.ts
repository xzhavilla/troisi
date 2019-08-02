import {HKT, Type2, Type3, URIS2, URIS3} from 'fp-ts/lib/HKT';
import {MonadThrow, MonadThrow2, MonadThrow3} from 'fp-ts/lib/MonadThrow';
import * as t from 'io-ts';
import {decodeF} from '../Decoder';
import {UnknownRecord} from '../UnknownRecord';
import {HttpClient, HttpClient2C, HttpClient3C, HttpMethod, HttpOptions} from './HttpClient';

interface DecodingHttpRequest<M> {
  (
    url: string,
    data?: unknown,
    headers?: UnknownRecord,
    options?: HttpOptions,
  ): {
    readonly decode: <A>(codec: t.Type<A, any, unknown>) => HKT<M, A>
  }
}

export interface DecodingHttpClient<M> extends MonadThrow<M> {
  readonly delete: DecodingHttpRequest<M>
  readonly get: DecodingHttpRequest<M>
  readonly head: DecodingHttpRequest<M>
  readonly patch: DecodingHttpRequest<M>
  readonly post: DecodingHttpRequest<M>
  readonly put: DecodingHttpRequest<M>
}

interface DecodingHttpRequest2C<M extends URIS2, L> {
  (
    url: string,
    data?: unknown,
    headers?: UnknownRecord,
    options?: HttpOptions,
  ): {
    readonly decode: <A>(codec: t.Type<A, any, unknown>) => Type2<M, L, A>
  }
}

export interface DecodingHttpClient2C<M extends URIS2, L> extends MonadThrow2<M> {
  readonly delete: DecodingHttpRequest2C<M, L>
  readonly get: DecodingHttpRequest2C<M, L>
  readonly head: DecodingHttpRequest2C<M, L>
  readonly patch: DecodingHttpRequest2C<M, L>
  readonly post: DecodingHttpRequest2C<M, L>
  readonly put: DecodingHttpRequest2C<M, L>
}

interface DecodingHttpRequest3C<M extends URIS3, U, L> {
  (
    url: string,
    data?: unknown,
    headers?: UnknownRecord,
    options?: HttpOptions,
  ): {
    readonly decode: <A>(codec: t.Type<A, any, unknown>) => Type3<M, U, L, A>
  }
}

export interface DecodingHttpClient3C<M extends URIS3, U, L> extends MonadThrow3<M> {
  readonly delete: DecodingHttpRequest3C<M, U, L>
  readonly get: DecodingHttpRequest3C<M, U, L>
  readonly head: DecodingHttpRequest3C<M, U, L>
  readonly patch: DecodingHttpRequest3C<M, U, L>
  readonly post: DecodingHttpRequest3C<M, U, L>
  readonly put: DecodingHttpRequest3C<M, U, L>
}

const decodingHttpRequest = <M>(m: HttpClient<M> & MonadThrow<M>, method: HttpMethod): DecodingHttpRequest<M> =>
  (url, data?, headers?, options?) => ({
    decode: codec => m.chain(
      m[method](url, data, headers, options),
      decodeF(m)()(codec),
    ),
  });

export function DecodingHttpClient<M extends URIS3, U, L>(m: HttpClient3C<M, U, L> & MonadThrow3<M>): DecodingHttpClient3C<M, U, L>
export function DecodingHttpClient<M extends URIS2, L>(m: HttpClient2C<M, L> & MonadThrow2<M>): DecodingHttpClient2C<M, L>
export function DecodingHttpClient<M>(m: HttpClient<M> & MonadThrow<M>): DecodingHttpClient<M>
export function DecodingHttpClient<M>(m: HttpClient<M> & MonadThrow<M>): DecodingHttpClient<M> {
  return {
    ...m,
    delete: decodingHttpRequest(m, 'delete'),
    get: decodingHttpRequest(m, 'get'),
    head: decodingHttpRequest(m, 'head'),
    patch: decodingHttpRequest(m, 'patch'),
    post: decodingHttpRequest(m, 'post'),
    put: decodingHttpRequest(m, 'put'),
  };
}
