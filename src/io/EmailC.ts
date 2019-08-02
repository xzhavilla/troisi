import * as t from 'io-ts';
import {BodyC} from './BodyC';
import {RecipientC} from './RecipientC';

export const EmailC = t.intersection([
  t.type({
    from: RecipientC,
    to: t.array(RecipientC),
    subject: t.string,
  }),
  t.partial({
    cc: t.array(RecipientC),
    bcc: t.array(RecipientC),
    replyTo: RecipientC,
    body: BodyC,
  }),
]);
