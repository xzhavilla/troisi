import {json} from 'body-parser';
import {Express} from 'express';
import {ask, Reader} from 'fp-ts/lib/Reader';
import {Environment} from '../src/Environment';
import {NewEmail} from './Email/NewEmail';
import {ErrorHandler} from './ErrorHandler';
import {HttpErrorHandler} from './HttpErrorHandler';
import {SendGridInitializer} from './SendGridInitializer';
import {SyntaxErrorHandler} from './SyntaxErrorHandler';
import cors = require('cors');
import multer = require('multer');

const PATH_EMAILS = '/api/v1/emails';

export const Api = {
  fromExpress: (express: Express): Reader<Environment, Express> =>
    ask<Environment>()
      .chain(() => SendGridInitializer)
      .map(() => express)
      .map(x => x.use(cors()))
      .map(x => x.use(SyntaxErrorHandler))
      .chain(
        x => NewEmail.map(
          f => x.post(
            PATH_EMAILS,
            (req, res, next) => req.is('application/json')
              ? next()
              : next('route'),
            json(),
            f
          )
        )
      )
      .chain(
        x => NewEmail.map(
          f => x.post(
            PATH_EMAILS,
            (req, res, next) => req.is('multipart/form-data')
              ? next()
              : next('route'),
            multer({storage: multer.memoryStorage()}).array('attachments'),
            f
          )
        )
      )
      .map(x => x.use(ErrorHandler))
      .chain(x => HttpErrorHandler.map(f => x.use(f))),
};
