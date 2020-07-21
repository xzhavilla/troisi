import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';

export const BodyC = t.union([
  t.intersection([
    t.type({plain: NonEmptyString}),
    t.partial({html: NonEmptyString}),
  ]),
  t.intersection([
    t.partial({plain: NonEmptyString}),
    t.type({html: NonEmptyString}),
  ]),
  t.type({
    plain: NonEmptyString,
    html: NonEmptyString,
  }),
], 'Body');
