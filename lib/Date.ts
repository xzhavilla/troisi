import {Getter} from 'monocle-ts';

export const Date_ = {
  getter: {
    iso: new Getter<Date, string>(
      date => date.toISOString().split('T')[0],
    ),
  },
};
