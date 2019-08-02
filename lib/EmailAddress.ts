import {identity} from 'fp-ts/lib/function';
import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';

export type EmailAddress = string

// http://emailregex.com/
const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailAddressC = new t.Type<EmailAddress>(
  'EmailAddress',
  NonEmptyString.is,
  (u, c) => NonEmptyString
    .validate(u, c)
    .chain(
      s => regExp.test(s)
        ? t.success(s)
        : t.failure(s, c),
    ),
  identity,
);
