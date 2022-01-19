import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ScheduledEvent } from 'aws-lambda';
import { ScoreboardService } from 'src/services/scoreboard-service';
import { WebClient } from "@slack/web-api"
import { wordleHeader } from "../../types/constants"

export const dailyPoster = async (event?:ScheduledEvent | null) => {
  const token = process.env.SLACK_TOKEN;
  const slack = new WebClient(token);
  console.log('hitting')
  const scoreboardService = new ScoreboardService();
  const scoreboards = await scoreboardService.getScoreboards()
  console.log(scoreboards)
  scoreboards.forEach(async scoreboard => {
    const channel = scoreboard.id;
    console.log(channel)
    const res = await slack.chat.postMessage({
      channel,
      text: wordleHeader
    })

    console.log(res)

    const ts = res.message.ts

    await scoreboardService.refreshToday(channel, ts, {})
  })

  return formatJSONResponse({
    message: `Hello ${event}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(dailyPoster);
