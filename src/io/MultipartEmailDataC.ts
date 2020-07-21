import {identity} from 'fp-ts/lib/function';
import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {EmailC} from './EmailC';
import {ResourceC} from './ResourceC';

export const MultipartEmailDataC = new t.Type(
  'MultipartEmailData',
  ResourceC('emails', EmailC).is,
  (u, c) => t.type({data: NonEmptyString})
    .validate(u, c)
    .chain(resource => {
      try {
        return t.success({data: JSON.parse(resource.data)});
      } catch (error) {
        return t.failure(resource, c);
      }
    }),
  identity
);
