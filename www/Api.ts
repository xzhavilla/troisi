import {json} from 'body-parser';
import {Express} from 'express';
import {ask, Reader} from 'fp-ts/lib/Reader';
import {Environment} from '../src/Environment';
import {NewEmail} from './Email/NewEmail';
import {ErrorHandler} from './ErrorHandler';
import {HttpErrorHandler} from './HttpErrorHandler';
import {SendGridInitializer} from './SendGridInitializer';
import {SyntaxErrorHandler} from './SyntaxErrorHandler';

const PATH_EMAILS = '/api/v1/emails';

export const Api = {
  fromExpress: (express: Express): Reader<Environment, Express> =>
    ask<Environment>()
      .chain(() => SendGridInitializer)
      .map(() => express)
      .map(x => x.use(json()))
      .map(x => x.use(SyntaxErrorHandler))
      .chain(x => NewEmail.map(f => x.post(PATH_EMAILS, f)))
      .map(x => x.use(ErrorHandler))
      .chain(x => HttpErrorHandler.map(f => x.use(f))),
};
