import {ErrorRequestHandler} from 'express';
import {identity} from 'fp-ts/lib/function';
import {Prism} from 'monocle-ts';
import {BadInputError} from '../lib/Error/ClientError';

const syntaxErrorPrism = Prism.fromPredicate<unknown, SyntaxError>(
  (u): u is SyntaxError => u instanceof SyntaxError,
);

export const SyntaxErrorHandler: ErrorRequestHandler =
  (err, req, res, next) => next(
    syntaxErrorPrism
      .getOption(err)
      .map(BadInputError.fromError)
      .fold(err, identity),
  );
