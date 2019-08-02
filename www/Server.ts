import {fromNullable} from 'fp-ts/lib/Option';
import {ask, fromReader, ReaderTaskEither, tryCatch} from 'fp-ts/lib/ReaderTaskEither';
import {Server} from 'http';
import {Int} from 'io-ts';
import {Getter} from 'monocle-ts';
import {Error_} from '../lib/Error';
import {Errors} from '../lib/Errors';
import {Environment} from '../src/Environment';
import {Services} from '../src/Services';
import {Api} from './Api';

export const Server_ = {
  fromPort: (port: Int): ReaderTaskEither<Environment, Errors, Server> =>
    ask<Environment, Errors>()
      .map(Environment.lens.services.composeLens(Services.lens.httpServer).get)
      .map(Api.fromExpress)
      .chain(fromReader)
      .chain(
        express => tryCatch(
          () => new Promise(
            (resolve, reject) => {
              const server = express
                .listen(
                  port,
                  (error?: Error) =>
                    fromNullable(error)
                      .foldL(
                        () => resolve(server),
                        reject,
                      ),
                );
            },
          ),
          (u): Errors => Error_.prism.self
            .getOption(u)
            .foldL(
              () => Errors('Cannot start server'),
              Errors,
            ),
        ),
      ),
  getter: {
    address: new Getter((server: Server) => server.address()),
  },
};
