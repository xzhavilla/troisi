import {array} from 'fp-ts/lib/Array';
import {identity} from 'fp-ts/lib/function';
import {Monoid} from 'fp-ts/lib/Monoid';
import {setoidNumber} from 'fp-ts/lib/Setoid';
import {STATUS_CODES} from 'http';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {fromFoldable, Prism} from 'monocle-ts';
import {Error_} from '../Error';
import {ClientError} from '../Error/ClientError';
import {Lenses} from '../Lenses';

const Status = {
  BadInputError: 400,
  UnauthorizedError: 401,
  ForbiddenError: 403,
  NotFoundError: 404,
  InternalServerError: 500,
};

export class HttpError extends Error {
  constructor(
    message?: string,
    readonly status: number = Status.InternalServerError,
    readonly previous?: Error,
  ) {
    super(
      NonEmptyString
        .decode(message)
        .fold(
          () => STATUS_CODES[status],
          identity,
        ),
    );
  }

  static fromError = (error: Error | unknown): HttpError => {
    if (!(error instanceof Error)) {
      return new HttpError();
    }

    const message = Error_
      .optional.message
      .getOption(error)
      .fold(undefined, identity);

    if (!(error instanceof ClientError)) {
      return new HttpError(message, undefined, error);
    }

    switch (error.tag) {
      case 'BadInputError':
      case 'ForbiddenError':
      case 'NotFoundError':
      case 'UnauthorizedError':
        return new HttpError(
          message,
          Status[error.tag],
          error,
        );
    }

    return new HttpError();
  };

  static lens = {
    ...Lenses.fromProps<HttpError>()({status: 'status'}),
  };

  static prism = {
    self: Prism.fromPredicate<unknown, HttpError>(
      (u): u is HttpError => u instanceof HttpError,
    ),
    notFound: Prism.fromPredicate<HttpError>(
      error => setoidNumber
        .equals(
          Status.NotFoundError,
          HttpError.lens.status.get(error),
        ),
    ),
  };

  static fold = {self: fromFoldable(array)<HttpError>()};

  static monoid: { status: Monoid<number> } = {
    status: {
      concat: function (a: number, b: number) {
        if (isNaN(a)) {
          return b;
        }

        if (isNaN(b)) {
          return a;
        }

        if (setoidNumber.equals(a, b)) {
          return a;
        }

        const min = Math.floor(Math.min(a, b));

        return min - min % 100;
      },
      empty: NaN,
    },
  };
}
