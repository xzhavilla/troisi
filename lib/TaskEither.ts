import {right} from 'fp-ts/lib/Either';
import {Task} from 'fp-ts/lib/Task';
import {TaskEither} from 'fp-ts/lib/TaskEither';

export const TaskEither_ = {
  fromTask: <L, A>(task: Task<A>) =>
    new TaskEither(
      task.map(a => right<L, A>(a)),
    ),
};
