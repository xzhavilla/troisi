import * as t from 'io-ts';
import {Lenses} from '../lib/Lenses';
import {Optionals} from '../lib/Optionals';
import {EmailC} from './io/EmailC';

type _Email = t.TypeOf<typeof EmailC>

export interface Email extends _Email {
}

export const Email = {
  lens: Lenses.fromProps<Email>()({
    from: 'from',
    to: 'to',
    subject: 'subject',
    body: 'body',
  }),
  optional: Optionals.fromNullableProps<Email>()({
    cc: 'cc',
    bcc: 'bcc',
    replyTo: 'replyTo',
  }),
};
