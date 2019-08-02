import {Lens} from 'monocle-ts';
import {indexArray} from 'monocle-ts/lib/Index/Array';

export const Process = {
  optional: {
    arg: (n: number) => Lens
      .fromProp<NodeJS.Process>()('argv')
      .composeOptional(indexArray<string>().index(n)),
  },
};
