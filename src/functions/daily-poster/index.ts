import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      schedule: {
        enabled: true,
        name: 'wordleDailyPoster',
        description: 'Posts the daily Wordle thread with links and scoreboard',
        rate: ["cron(0 15 ? * MON-FRI *)"]
      }
    }
  ]
}