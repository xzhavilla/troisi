import * as t from 'io-ts';

export const ResourceC = <C extends t.Mixed>(type: string, codec: C) =>
  t.type({
    data: t.type({
      type: t.literal(type),
      attributes: codec,
    }),
  });
