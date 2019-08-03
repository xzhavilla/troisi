import express from 'express';
import {error, info, warn} from 'fp-ts/lib/Console';
import {NonEmptyString_} from '../lib/NonEmptyString';
import {mute} from '../lib/Silencer';
import {Environment} from '../src/Environment';
import {string} from '../src/functions';
import MailService = require('@sendgrid/mail');

export const env: Environment = {
  parameters: {
    sendGrid: {
      tokens: {
        api: NonEmptyString_.prism.self.getOption(process.env.SENDGRID_TOKENS_API).getOrElseL(string),
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
      log: mute,
      warn: warn,
      error: error,
      info: info,
    },
  },
};
