import {io} from 'fp-ts/lib/IO';
import {Logger} from './Logger';

export const mute: Logger = io.of;
