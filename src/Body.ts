import * as t from 'io-ts';
import {Optionals} from '../lib/Optionals';
import {BodyC} from './io/BodyC';

export type Body = t.TypeOf<typeof BodyC>

export const Body = {
  optional: Optionals.fromNullableProps<Body>()({
    plain: 'plain',
    html: 'html',
  }),
};
