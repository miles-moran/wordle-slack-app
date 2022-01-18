import { handlerPath } from '@libs/handlerResolver';
import { ENV_VARS } from 'src/types/env';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    SLACK_TOKEN: ENV_VARS.slackToken,
    WORDLE_TABLE: ENV_VARS.worldTable
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'wordle/listener/init'
      }
    }
  ]
}
