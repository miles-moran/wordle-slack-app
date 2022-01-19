import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    SLACK_TOKEN:  "${self:custom.slackToken.${self:provider.stage}}",
    WORDLE_TABLE:  "${self:custom.wordleTableName.${self:provider.stage}}"
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'wordle/events',
      }
    }, 
  ],
  slack: {
    slashCommands: {
      command: "/init",
      description: "Creates a leaderboard for the channel",
      usage_hint: "Create a leaderboard"
    }
  }
}
