import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {EmailAddressC} from '../../lib/EmailAddress';

export const RecipientC = t.intersection([
  t.type({
    address: EmailAddressC,
  }),
  t.partial({
    name: NonEmptyString,
  }),
], 'Recipient');
