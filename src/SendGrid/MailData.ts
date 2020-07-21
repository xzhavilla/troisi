import {identity} from 'fp-ts/lib/function';
import {Body} from '../Body';
import {Email} from '../Email';
import {File} from '../File';
import {Recipient} from '../Recipient';
import {AttachmentData} from './AttachmentData';

export interface MailData {
  from: string
  to: Array<string>
  cc?: Array<string>
  bcc?: Array<string>
  replyTo?: string
  subject: string
  text?: string
  html?: string
  attachments: Array<AttachmentData>
}

export const MailData = {
  fromEmail: (email: Email): MailData => ({
    from: Email.lens.from.composeGetter(Recipient.getter.mailbox).get(email),
    to: Email.lens.to.composeFold(Recipient.fold.mailbox).getAll(email),
    cc: Email.optional.cc.composeFold(Recipient.fold.mailbox).getAll(email),
    bcc: Email.optional.bcc.composeFold(Recipient.fold.mailbox).getAll(email),
    replyTo: Email.optional.replyTo.composeGetter(Recipient.getter.mailbox).headOption(email).fold(undefined, identity),
    subject: Email.lens.subject.get(email),
    text: Email.lens.body.composeOptional(Body.optional.plain).getOption(email).fold(undefined, identity),
    html: Email.lens.body.composeOptional(Body.optional.html).getOption(email).fold(undefined, identity),
    attachments: Email.optional.attachments
      .composeTraversal(File.traversal.self)
      .composeGetter(File.getter.attachmentData)
      .getAll(email)
  }),
};
