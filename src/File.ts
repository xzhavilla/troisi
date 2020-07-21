import {array} from 'fp-ts/lib/Array';
import {fromTraversable, Getter} from 'monocle-ts';
import {AttachmentData} from './SendGrid/AttachmentData';

export interface File {
  name: string
  type: string
  size: number
  buffer: Buffer
}

export const File = {
  getter: {
    attachmentData: new Getter<File, AttachmentData>(
      file => ({
        filename: file.name,
        type: file.type,
        content: file.buffer.toString()
      })
    )
  },
  traversal: {
    self: fromTraversable(array)<File>()
  }
};
