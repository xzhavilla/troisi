import {identity} from 'fp-ts/lib/function';
import {Body} from './Body';
import {Email} from './Email';
import {Recipient} from './Recipient';

export interface Payload {
  from: string
  to: Array<string>
  cc?: Array<string>
  bcc?: Array<string>
  replyTo?: string
  subject: string
  text?: string
  html?: string
}

export const Payload = {
  fromEmail: (email: Email): Payload => ({
    from: Email.lens.from.composeGetter(Recipient.getter.mailbox).get(email),
    to: Email.lens.to.composeFold(Recipient.fold.mailbox).getAll(email),
    cc: Email.optional.cc.composeFold(Recipient.fold.mailbox).getAll(email),
    bcc: Email.optional.bcc.composeFold(Recipient.fold.mailbox).getAll(email),
    replyTo: Email.optional.replyTo.composeGetter(Recipient.getter.mailbox).headOption(email).fold(undefined, identity),
    subject: Email.lens.subject.get(email),
    text: Email.optional.body.composeOptional(Body.optional.plain).getOption(email).fold(undefined, identity),
    html: Email.optional.body.composeOptional(Body.optional.html).getOption(email).fold(undefined, identity),
  }),
};
