import {identity} from 'fp-ts/lib/function';
import {Error_} from './index';

export abstract class ClientError extends Error {
  abstract readonly tag: string;

  constructor(
    message?: string,
    readonly previous?: Error,
  ) {
    super(message);
  }
}

export class BadInputError extends ClientError {
  readonly tag = 'BadInputError';

  static fromError = (error: Error): ClientError =>
    new BadInputError(
      Error_.optional.message
        .getOption(error)
        .fold(undefined, identity),
      error,
    );
}

export class ForbiddenError extends ClientError {
  readonly tag = 'ForbiddenError';

  static fromError = (error: Error): ClientError =>
    new ForbiddenError(
      Error_.optional.message
        .getOption(error)
        .fold(undefined, identity),
      error,
    );
}

export class NotFoundError extends ClientError {
  readonly tag = 'NotFoundError';

  static fromError = (error: Error): ClientError =>
    new NotFoundError(
      Error_.optional.message
        .getOption(error)
        .fold(undefined, identity),
      error,
    );
}

export class UnauthorizedError extends ClientError {
  readonly tag = 'UnauthorizedError';

  static fromError = (error: Error): ClientError =>
    new UnauthorizedError(
      Error_.optional.message
        .getOption(error)
        .fold(undefined, identity),
      error,
    );
}
