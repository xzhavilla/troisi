import {Lens} from 'monocle-ts';

export const Lenses = {
  fromProps: <S, T = S>() => <P extends keyof S & keyof T, R extends Record<string, P>>(props: R): { [K in keyof R]: Lens<S, S[R[K] & P], T, T[R[K] & P]> } =>
    Object.keys(props)
      .reduce(
        (lenses, k) => ({
          ...lenses,
          [k]: Lens.fromProp<S, T>()(props[k]),
        }),
        {} as { [K in keyof R]: Lens<S, S[R[K] & P], T, T[R[K] & P]> },
      ),
};
