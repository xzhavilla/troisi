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
    from: Email.lens.from.composeGetter(Recipient.getter.xxx).get(email),
    to: Email.lens.to.composeFold(Recipient.fold.xxx).getAll(email),
    cc: Email.optional.cc.composeFold(Recipient.fold.xxx).getAll(email),
    bcc: Email.optional.cc.composeFold(Recipient.fold.xxx).getAll(email),
    replyTo: Email.optional.replyTo.composeGetter(Recipient.getter.xxx).headOption(email).fold(undefined, identity),
    subject: Email.lens.subject.get(email),
    text: Email.optional.body.composeOptional(Body.optional.plain).getOption(email).fold(undefined, identity),
    html: Email.optional.body.composeOptional(Body.optional.html).getOption(email).fold(undefined, identity),
  }),
};
