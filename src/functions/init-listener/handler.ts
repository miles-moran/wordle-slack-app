import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { ScoreboardService } from "../../services/scoreboard-service"
import { URLSearchParams } from "url"
const initListener = async (event:APIGatewayEvent) => {
  console.log(event)
  const scoreboardService = new ScoreboardService();
  const params = new URLSearchParams(event.body)
  console.log(params)
  const ts = params.get('ts');
  console.log(ts)
  const scoreboard = scoreboardService.getScoreboard(ts);
  if (scoreboard){
    return formatJSONResponse({
      response_type: "in_channel",
      text: 'A Wordle leaderboard has already been created.'
    })
  }

  const res = scoreboardService.createScoreboard({
    today: {},
    total: [],
    ts
  })

  console.log(res)

  return formatJSONResponse({
    response_type: "in_channel",
    text: 'A Wordle leaderboard has been created for this channel.'
  })
}

export const main = middyfy(initListener);
