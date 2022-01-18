import { handlerPath } from '@libs/handlerResolver';
import { ENV_VARS } from 'src/types/env';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    slackToken: ENV_VARS.worldTable
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
