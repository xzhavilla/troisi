import {array} from 'fp-ts/lib/Array';
import * as t from 'io-ts';
import {fromTraversable, Getter} from 'monocle-ts';
import {Lenses} from '../lib/Lenses';
import {Optionals} from '../lib/Optionals';
import {RecipientC} from './io/RecipientC';

type _Recipient = t.TypeOf<typeof RecipientC>

export interface Recipient extends _Recipient {
}

const lenses = Lenses.fromProps<Recipient>()({address: 'address'});
const optionals = Optionals.fromNullableProps<Recipient>()({name: 'name'});
const getters = {
  mailbox: new Getter<Recipient, string>(
    recipient => optionals.name
      .getOption(recipient)
      .fold(
        lenses.address.get(recipient),
        name => `${name} <${lenses.address.get(recipient)}>`,
      ),
  ),
  obfuscatedAddress: new Getter<Recipient, string>(
    recipient => lenses.address
      .get(recipient)
      .split('@')
      .map(part => part.replace(/(?<=.)./g, '*'))
      .join('@'),
  ),
};
const traversals = {self: fromTraversable(array)<Recipient>()};

export const Recipient = {
  lens: lenses,
  optional: optionals,
  getter: getters,
  traversal: traversals,
  fold: {
    mailbox: traversals.self.composeGetter(getters.mailbox),
  },
};
