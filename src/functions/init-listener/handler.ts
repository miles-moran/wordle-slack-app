import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { ScoreboardService } from "../../services/scoreboard-service"
const initListener = async (event:APIGatewayEvent) => {
  const body = JSON.parse(event.body);
  console.log(body)
  const scoreboardService = new ScoreboardService();
  const { ts } = body.channel

  const res = scoreboardService.createScoreboard({
    today: {},
    total: [],
    ts
  })

  return formatJSONResponse({
    response_type: "in_channel",
    text: 'A Wordle leaderboard has been created for this channel.'
  })
}

export const main = middyfy(initListener);
