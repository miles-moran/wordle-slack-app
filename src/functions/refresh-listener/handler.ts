import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { URLSearchParams } from "url"
import { refreshThread } from "../_shared"

const refreshListener = async (event:APIGatewayEvent) => {
  const params = new URLSearchParams(event.body)
  const channelId = params.get('channel_id');
  await refreshThread(channelId);

  return formatJSONResponse({
    response_type: "ephemeral",
    text: 'The Wordle leaderboard has been refreshed.'
  })
}

export const main = middyfy(refreshListener);
