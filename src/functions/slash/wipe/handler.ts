import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { ScoreboardService } from "../../../services/scoreboard-service"
import { URLSearchParams } from "url"
import { refreshThread } from "../../_shared"

const slashWipe = async (event:APIGatewayEvent) => {
  const scoreboardService = new ScoreboardService();
  const params = new URLSearchParams(event.body)
  const channelId = params.get('channel_id');
  const scoreboard = await scoreboardService.getScoreboard(channelId)

  if (!scoreboard){
    return formatJSONResponse({
      response_type: "ephemeral",
      text: 'No Wordle scoreboard exists for this channel'
    })
  }

  console.log('channelId', channelId)

  await scoreboardService.editScoreboard(channelId, {}, {})
  await refreshThread(channelId);

  return formatJSONResponse({
    response_type: "in_channel",
    text: 'The Wordle leaderboard has been wiped.'
  })
}

export const main = middyfy(slashWipe);
