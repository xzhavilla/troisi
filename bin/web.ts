#!/usr/bin/env node

import {fromOption} from 'fp-ts/lib/Either';
import {fromEither, readerTaskEither} from 'fp-ts/lib/ReaderTaskEither';
import {IntFromString} from 'io-ts-types/lib/IntFromString';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {env} from '../etc/env';
import {decodeF} from '../lib/Decoder';
import {Errors} from '../lib/Errors';
import {Environment} from '../src/Environment';
import {Process} from '../src/Process';
import {Server_} from '../www/Server';

readerTaskEither
  .of<Environment, Errors, NodeJS.Process>(process)
  .map(process => Process.optional.arg(2).getOption(process))
  .map(fromOption(Errors('Server port cannot be empty')))
  .chain(fromEither)
  .chain(decodeF(readerTaskEither)<Environment, Errors>()(NonEmptyString))
  .chain(decodeF(readerTaskEither)<Environment, Errors>()(IntFromString))
  .chain(Server_.fromPort)
  .run(env)
  .then(
    either => either
      .fold<any>(
        errors => errors.map(error => console.error(error)),
        server => console.log('Server listening:', Server_.getter.address.get(server)),
      ),
  );
