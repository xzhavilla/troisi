import {ErrorRequestHandler} from 'express';
import {io} from 'fp-ts/lib/IO';
import {NonEmptyArray} from 'fp-ts/lib/NonEmptyArray2v';
import {ask, Reader} from 'fp-ts/lib/Reader';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {Error_} from '../lib/Error';
import {HttpError} from '../lib/Http/HttpError';
import {logF} from '../lib/Logger';
import {Environment} from '../src/Environment';
import {Services} from '../src/Services';

export const HttpErrorHandler: Reader<Environment, ErrorRequestHandler> =
  ask<Environment>()
    .map(
      environment => {
        const logger = Environment.lens.services.composeLens(Services.lens.error).get(environment);

        return (errors: NonEmptyArray<HttpError>, req, res, next) => {
          if (res.headersSent) {
            next(errors);

            return;
          }

          const status = HttpError.fold.self
            .foldMap(HttpError.monoid.status)(HttpError.lens.status.get)(errors);

          res
            .status(status)
            .json({
              errors: errors
                .map(
                  error => {
                    const name = Error_.lens.previous
                      .composeLens(Error_.lens.name)
                      .get(error);
                    const detail = Error_.optional.message
                      .getOption(error)
                      .fold('', message => `: ${message}`);

                    return logF(io)(logger)(`${name}${detail}`)(error).run();
                  },
                )
                .map(
                  error => ({
                    status: String(HttpError.lens.status.get(error)),
                    ...NonEmptyString
                      .decode(
                        Error_.optional.message
                          .getOption(error)
                          .getOrElse(''),
                      )
                      .fold(() => undefined, message => ({detail: message})),
                  }),
                ),
            });
        };
      },
    );
