import {ask, Reader} from 'fp-ts/lib/Reader';
import {Environment} from '../src/Environment';
import {Parameters} from '../src/Parameters';
import {Services} from '../src/Services';

export const SendGridInitializer: Reader<Environment, void> =
  ask<Environment>()
    .map(
      environment => {
        const sendGridClient = Environment.lens.services.composeLens(Services.lens.sendGridClient).get(environment);
        const apiToken = Environment.lens.parameters.composeLens(Parameters.sendGrid.lens.apiToken).get(environment);

        sendGridClient.setApiKey(apiToken);
      },
    );
