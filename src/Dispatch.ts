import {constVoid} from 'fp-ts/lib/function';
import {ask, readerTaskEither, tryCatch} from 'fp-ts/lib/ReaderTaskEither';
import {Errors} from '../lib/Errors';
import {logF} from '../lib/Logger';
import {Email} from './Email';
import {Environment} from './Environment';
import {Payload} from './Payload';
import {Recipient} from './Recipient';
import {Services} from './Services';

export const Dispatch = {
  fromEmail: (email: Email) => ask<Environment, Errors>()
    .map(Environment.lens.services.composeLens(Services.lens.info).get)
    .chain(logger => logF(readerTaskEither)<Environment, Errors>(logger)(`>¦  Sending email from "${Email.lens.from.composeGetter(Recipient.getter.obfuscatedAddress).get(email)}" to "${Email.lens.to.composeTraversal(Recipient.traversal.self).composeGetter(Recipient.getter.obfuscatedAddress).getAll(email).join('", "')}"`)(undefined))
    .chain(
      () => tryCatch<Environment, Errors, void>(
        environment => {
          const sendGridClient = Environment.lens.services.composeLens(Services.lens.sendGridClient).get(environment);
          const payload = Payload.fromEmail(email);

          return sendGridClient
            .send(payload)
            .then(constVoid);
        },
        (error: any) => Errors(
          ...((((error || {}).response || {}).body || {}).errors || [])
            .map((err: any) => (err || {}).message),
        ),
      ),
    )
    .chain(
      () => ask<Environment, Errors>()
        .map(Environment.lens.services.composeLens(Services.lens.info).get)
        .chain(logger => logF(readerTaskEither)<Environment, Errors>(logger)(' ¦> Email sent successfully')(undefined)),
    ),
};
