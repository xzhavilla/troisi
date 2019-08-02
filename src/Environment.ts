import {Lenses} from '../lib/Lenses';
import {Parameters} from './Parameters';
import {Services} from './Services';

export interface Environment {
  parameters: Parameters
  services: Services
}

export const Environment = {
  lens: Lenses.fromProps<Environment>()({
    parameters: 'parameters',
    services: 'services',
  }),
};
