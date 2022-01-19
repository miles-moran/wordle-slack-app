import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { ScoreboardService } from "../../../services/scoreboard-service"
import { URLSearchParams } from "url"

const slashInit = async (event:APIGatewayEvent) => {
  const scoreboardService = new ScoreboardService();
  const params = new URLSearchParams(event.body)
  const channelId = params.get('channel_id');
  const scoreboard = await scoreboardService.getScoreboard(channelId)

  console.log('scoreboard', scoreboard)

  if (scoreboard){
    return formatJSONResponse({
      response_type: "ephemeral",
      text: 'A Wordle leaderboard has already been created for this channel.'
    })
  }

  console.log('channelId', channelId)

  const res = await scoreboardService.createScoreboard({
    today: {},
    total: {},
    ts: null,
    id: channelId
  })

  console.log(res)

  return formatJSONResponse({
    response_type: "in_channel",
    text: 'A Wordle leaderboard has been created for this channel.'
  })
}

export const main = middyfy(slashInit);
