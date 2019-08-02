import {HKT, Type, Type2, Type3, URIS, URIS2, URIS3} from 'fp-ts/lib/HKT';
import {Monad, Monad1, Monad2, Monad3} from 'fp-ts/lib/Monad';
import {UnknownRecord} from '../UnknownRecord';

export interface HttpOptions {
  json: boolean
}

export interface HttpRequest<M> {
  (
    url: string,
    data?: unknown,
    headers?: UnknownRecord,
    options?: HttpOptions,
  ): HKT<M, unknown>
}

export interface HttpClient<M> extends Monad<M> {
  readonly delete: HttpRequest<M>
  readonly get: HttpRequest<M>
  readonly head: HttpRequest<M>
  readonly patch: HttpRequest<M>
  readonly post: HttpRequest<M>
  readonly put: HttpRequest<M>
}

export interface HttpRequest1<M extends URIS> {
  (
    url: string,
    data?: unknown,
    headers?: UnknownRecord,
    options?: HttpOptions,
  ): Type<M, unknown>
}

export interface HttpClient1<M extends URIS> extends Monad1<M> {
  readonly delete: HttpRequest1<M>
  readonly get: HttpRequest1<M>
  readonly head: HttpRequest1<M>
  readonly patch: HttpRequest1<M>
  readonly post: HttpRequest1<M>
  readonly put: HttpRequest1<M>
}

export interface HttpRequest2C<M extends URIS2, L> {
  (
    url: string,
    data?: unknown,
    headers?: UnknownRecord,
    options?: HttpOptions,
  ): Type2<M, L, unknown>
}

export interface HttpClient2C<M extends URIS2, L> extends Monad2<M> {
  readonly delete: HttpRequest2C<M, L>
  readonly get: HttpRequest2C<M, L>
  readonly head: HttpRequest2C<M, L>
  readonly patch: HttpRequest2C<M, L>
  readonly post: HttpRequest2C<M, L>
  readonly put: HttpRequest2C<M, L>
}

export interface HttpRequest3C<M extends URIS3, U, L> {
  (
    url: string,
    data?: unknown,
    headers?: UnknownRecord,
    options?: HttpOptions,
  ): Type3<M, U, L, unknown>
}

export interface HttpClient3C<M extends URIS3, U, L> extends Monad3<M> {
  readonly delete: HttpRequest3C<M, U, L>
  readonly get: HttpRequest3C<M, U, L>
  readonly head: HttpRequest3C<M, U, L>
  readonly patch: HttpRequest3C<M, U, L>
  readonly post: HttpRequest3C<M, U, L>
  readonly put: HttpRequest3C<M, U, L>
}

export type HttpMethod =
  & Exclude<keyof HttpClient<any>, keyof Monad<any>>
  & Exclude<keyof HttpClient1<URIS>, keyof Monad1<URIS>>
  & Exclude<keyof HttpClient2C<URIS2, any>, keyof Monad2<URIS2>>
  & Exclude<keyof HttpClient3C<URIS3, any, any>, keyof Monad3<URIS3>>
