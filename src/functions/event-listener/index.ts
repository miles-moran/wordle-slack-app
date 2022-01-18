import { handlerPath } from '@libs/handlerResolver';
import { ENV_VARS } from "../../types/env";
export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    slackToken: ENV_VARS.slackToken
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'wordle/listener',
      }
    }, 
  ]
}
