import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {Prism} from 'monocle-ts';

export const NonEmptyString_ = {
  prism: {
    self: Prism.fromPredicate<unknown, NonEmptyString>(
      (u): u is NonEmptyString => t.string.is(u) && u.length > 0,
    ),
  },
};
