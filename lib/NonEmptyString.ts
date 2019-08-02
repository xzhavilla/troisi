import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {Prism} from 'monocle-ts';

export const NonEmptyString_ = {
  prism: {
    self: Prism.fromPredicate<string, NonEmptyString>(
      (s): s is NonEmptyString => s.length > 0,
    ),
  },
};
