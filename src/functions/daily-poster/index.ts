import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    SLACK_TOKEN:  "${self:custom.slackToken.${self:provider.stage}}",
    WORDLE_TABLE:  "${self:custom.wordleTableName.${self:provider.stage}}"
  },
  events: [
    {
      schedule: {
        enabled: true,
        name: 'wordleDailyPoster',
        description: 'Posts the daily Wordle thread with links and scoreboard',
        rate: ["cron(0 6 ? * * *)"]
      }
    },
    {
      http: {
        method: 'post',
        path: 'wordle/daily/refresh',
      }
    }
  ]
}