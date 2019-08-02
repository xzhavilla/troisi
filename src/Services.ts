import MailService = require('@sendgrid/mail');
import {Express} from 'express';
import {Lens} from 'monocle-ts';
import {Logger} from '../lib/Logger';

export interface Services {
  clients: {
    sendGrid: typeof MailService.MailService
  }
  http: {
    server: Express
  }
  utils: {
    log: Logger
    warn: Logger
    error: Logger
    info: Logger
  }
}

const lens = Lens.fromPath<Services>();

export const Services = {
  lens: {
    sendGridClient: lens(['clients', 'sendGrid']),
    httpServer: lens(['http', 'server']),
    log: lens(['utils', 'log']),
    warn: lens(['utils', 'warn']),
    error: lens(['utils', 'error']),
    info: lens(['utils', 'info']),
  },
};
