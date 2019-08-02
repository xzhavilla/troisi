import {POptional} from 'monocle-ts';

export const Optionals = {
  fromNullableProps: <S, T = S>() => <P extends keyof S & keyof T, R extends Record<string, P>>(props: R): { [K in keyof R]: POptional<S, NonNullable<S[R[K] & P]>, T, NonNullable<T[R[K] & P]>> } =>
    Object.keys(props)
      .reduce(
        (optionals, k) => ({
          ...optionals,
          [k]: POptional.fromNullableProp<S, T>()(props[k]),
        }),
        {} as { [K in keyof R]: POptional<S, NonNullable<S[R[K] & P]>, T, NonNullable<T[R[K] & P]>> },
      ),
};
