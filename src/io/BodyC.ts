import * as t from 'io-ts';

export const BodyC = t.union([
  t.intersection([
    t.type({plain: t.string}),
    t.partial({html: t.string}),
  ]),
  t.intersection([
    t.partial({plain: t.string}),
    t.type({html: t.string}),
  ]),
  t.type({
    plain: t.string,
    html: t.string,
  }),
]);
