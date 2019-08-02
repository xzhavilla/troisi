import {Prism} from 'monocle-ts';

export const Iterable = {
  prism: {
    self: Prism.fromPredicate<unknown, IterableIterator<unknown>>(
      (u): u is IterableIterator<unknown> =>
        'object' === typeof u && null !== u && Symbol.iterator in u,
    ),
  },
};
