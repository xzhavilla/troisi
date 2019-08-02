import {none, some} from 'fp-ts/lib/Option';
import {Setoid} from 'fp-ts/lib/Setoid';
import {Index, Optional} from 'monocle-ts';

export const Index_ = {
  array: {
    property: <A extends object>() =>
      <P extends keyof A>(prop: P) =>
        (m: Setoid<A[P]>) =>
          new Index<Array<A>, A[P], A>(
            i => new Optional(
              s => {
                for (const x of s) {
                  if (m.equals(i, x[prop])) {
                    return some(x);
                  }
                }

                return none;
              },
              a => s =>
                s.findIndex(x => m.equals(i, x[prop])) < 0
                  ? s.concat(a)
                  : s.map(x => m.equals(i, x[prop]) ? a : x),
            ),
          ),
  },
};
