import {ErrorRequestHandler} from 'express';
import {fromArray, nonEmptyArray} from 'fp-ts/lib/NonEmptyArray2v';
import {HttpError} from '../lib/Http/HttpError';
import {Iterable} from '../lib/Iterable';

export const ErrorHandler: ErrorRequestHandler =
  (err, req, res, next) => next(
    fromArray(
      Iterable.prism.self
        .getOption(err)
        .fold([err], it => [...it]),
    )
      .getOrElseL(() => nonEmptyArray.of(undefined))
      .map(HttpError.fromError),
  );
