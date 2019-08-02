import {Getter, Lens, Prism} from 'monocle-ts';
import {Optionals} from '../Optionals';

export const Error_ = {
  lens: {
    name: new Lens<Error, string>(
      error => error.constructor.name || error.name,
      name => error => ({...error, name: name}),
    ),
    previous: new Lens<Error, Error>(
      error => (error as any).previous || error,
      previous => error => ({...error, previous: previous}),
    ),
  },
  prism: {
    self: Prism.fromPredicate<unknown, Error>(
      (u): u is Error => u instanceof Error,
    ),
  },
  optional: Optionals.fromNullableProps<Error>()({
    message: 'message',
    stack: 'stack',
  }),
  getter: {
    first: new Getter<Error, Error>(
      error => {
        let previous: Error;
        for (
          previous = error;
          undefined !== (previous as any).previous &&
          previous !== (previous as any).previous;
          previous = (previous as any).previous
        )
          ;

        return previous;
      },
    ),
  },
};
