import {RequestHandler} from 'express';
import {ask, Reader} from 'fp-ts/lib/Reader';
import {readerTaskEither} from 'fp-ts/lib/ReaderTaskEither';
import {decodeF} from '../../lib/Decoder';
import {BadInputError} from '../../lib/Error/ClientError';
import {Errors} from '../../lib/Errors';
import {Dispatch} from '../../src/Dispatch';
import {Email} from '../../src/Email';
import {Environment} from '../../src/Environment';
import {EmailC} from '../../src/io/EmailC';
import {ResourceC} from '../../src/io/ResourceC';
import {Resource} from '../../src/Resource';

const CREATED = 201;

export const NewEmail: Reader<Environment, RequestHandler> =
  ask<Environment>()
    .map(
      environment => (req, res, next) => {
        decodeF(readerTaskEither)<Environment, Errors>()(ResourceC('emails', EmailC))(req.body)
          .mapLeft(errors => Errors(...errors.map(BadInputError.fromError)))
          .map(Resource.lens.attributes<Email>().get)
          .chain(Dispatch.fromEmail)
          .run(environment)
          .then(
            either => either
              .fold(
                next,
                () => res.sendStatus(CREATED),
              ),
          );
      },
    );
