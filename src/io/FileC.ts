import {identity} from 'fp-ts/lib/function';
import * as t from 'io-ts';
import {File} from '../File';
import {BufferC} from './BufferC';

export const FileC = new t.Type<File>(
  'File',
  t.type({
    name: t.string,
    type: t.string,
    size: t.number,
    buffer: BufferC
  }).is,
  (u, c) => t.type({
    originalname: t.string,
    mimetype: t.string,
    size: t.number,
    buffer: BufferC
  })
    .validate(u, c)
    .map(file => ({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      buffer: file.buffer
    })),
  identity
);
