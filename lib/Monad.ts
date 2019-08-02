import {Monad, Monad1, Monad2, Monad3} from 'fp-ts/lib/Monad';
import {setoidString} from 'fp-ts/lib/Setoid';

type Monads = Monad<any> | Monad1<any> | Monad2<any> | Monad3<never>;

export const Monad_ = {
  setoid: {
    self: {
      equals: (a: Monads, b: Monads) =>
        setoidString.equals(a.URI, b.URI),
    },
  },
};
