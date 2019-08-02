import {Lens} from 'monocle-ts';

export interface Resource<A> {
  data: {
    type: string
    attributes: A
  }
}

export const Resource = {
  lens: {
    attributes: <A>() => Lens.fromPath<Resource<A>>()(['data', 'attributes']),
  },
};
