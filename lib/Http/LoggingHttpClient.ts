import {log} from 'fp-ts/lib/Console';
import {URIS, URIS2, URIS3} from 'fp-ts/lib/HKT';
import {MonadIO, MonadIO1, MonadIO2, MonadIO3} from 'fp-ts/lib/MonadIO';
import {logF} from '../Logger';
import {HttpClient, HttpClient1, HttpClient2C, HttpClient3C, HttpMethod, HttpRequest} from './HttpClient';

const loggingHttpRequest = <M>(m: HttpClient<M> & MonadIO<M>, method: HttpMethod): HttpRequest<M> =>
  (url, data?, headers?, options?) => m.chain(
    logF(m)(log)(`${method.toUpperCase()} ${url}`)(undefined),
    () => m[method](url, data, headers, options),
  );

export function LoggingHttpClient<M extends URIS3, U, L, T extends HttpClient3C<M, U, L> = HttpClient3C<M, U, L>>(m: HttpClient3C<M, U, L> & MonadIO3<M>): T
export function LoggingHttpClient<M extends URIS2, L, T extends HttpClient2C<M, L> = HttpClient2C<M, L>>(m: HttpClient2C<M, L> & MonadIO2<M>): T
export function LoggingHttpClient<M extends URIS, T extends HttpClient1<M> = HttpClient1<M>>(m: HttpClient1<M> & MonadIO1<M>): T
export function LoggingHttpClient<M, T extends HttpClient<M> = HttpClient<M>>(m: HttpClient<M> & MonadIO<M>): T
export function LoggingHttpClient<M>(m: HttpClient<M> & MonadIO<M>): typeof m {
  return {
    ...m,
    delete: loggingHttpRequest(m, 'delete'),
    get: loggingHttpRequest(m, 'get'),
    head: loggingHttpRequest(m, 'head'),
    patch: loggingHttpRequest(m, 'patch'),
    post: loggingHttpRequest(m, 'post'),
    put: loggingHttpRequest(m, 'put'),
  };
}
