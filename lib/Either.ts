import {Validation} from 'io-ts';
import {failure} from 'io-ts/lib/PathReporter';
import {Errors} from './Errors';

export const Either_ = {
  fromValidation: <A>(validation: Validation<A>) =>
    validation
      .mapLeft(failure)
      .mapLeft(errors => Errors(...errors)),
};
