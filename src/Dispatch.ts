import {constVoid} from 'fp-ts/lib/function';
import {tryCatch} from 'fp-ts/lib/ReaderTaskEither';
import {Errors} from '../lib/Errors';
import {Email} from './Email';
import {Environment} from './Environment';
import {Payload} from './Payload';
import {Services} from './Services';

export const Dispatch = {
  fromEmail: (email: Email) => tryCatch<Environment, Errors, void>(
    environment => {
      const sendGridClient = Environment.lens.services.composeLens(Services.lens.sendGridClient).get(environment);
      const payload = Payload.fromEmail(email);

      return sendGridClient
        .send(payload)
        .then(constVoid);
    },
    (error: any) => Errors((error || {}).message),
  ),
};
