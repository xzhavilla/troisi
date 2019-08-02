import {Lens} from 'monocle-ts';

export interface Parameters {
  sendGrid: {
    tokens: {
      api: string
    }
  }
}

const lens = Lens.fromPath<Parameters>();

export const Parameters = {
  sendGrid: {
    lens: {
      apiToken: lens(['sendGrid', 'tokens', 'api']),
    },
  },
};
