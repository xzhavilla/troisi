import express from 'express';
import {error, info, log, warn} from 'fp-ts/lib/Console';
import {Environment} from '../src/Environment';
import {string} from '../src/functions';
import MailService = require('@sendgrid/mail');

export const env: Environment = {
  parameters: {
    sendGrid: {
      tokens: {
        api: string(),
      },
    },
  },
  services: {
    clients: {
      sendGrid: MailService,
    },
    http: {
      server: express(),
    },
    utils: {
      log: log,
      warn: warn,
      error: error,
      info: info,
    },
  },
};
