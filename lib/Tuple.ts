import {array} from 'fp-ts/lib/Array';
import {Tuple} from 'fp-ts/lib/Tuple';
import {fromTraversable, Lens} from 'monocle-ts';

const lenses = <L, A, M = L, B = A>() => ({
  fst: Lens.fromProp<Tuple<L, A>, Tuple<M, A>>()('fst'),
  snd: Lens.fromProp<Tuple<L, A>, Tuple<L, B>>()('snd'),
});

export const Tuple_ = {
  lens: lenses,
  traversal: <L, A, M = L, B = A>() => ({
    fst: fromTraversable(array)<Tuple<L, A>, Tuple<M, A>>()
      .composeLens(lenses<L, A, M, B>().fst),
    snd: fromTraversable(array)<Tuple<L, A>, Tuple<L, B>>()
      .composeLens(lenses<L, A, M, B>().snd),
  }),
};
